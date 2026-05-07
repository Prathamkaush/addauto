import { All, Controller, HttpException, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

const SERVICE_MAP: Record<string, string> = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3005',
  users: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
  advertisers: process.env.ADVERTISERS_SERVICE_URL || 'http://localhost:3003',
  campaigns: process.env.CAMPAIGNS_SERVICE_URL || 'http://localhost:3004',
};

@Controller()
export class GatewayController {
  @All('health')
  health() {
    return { status: 'ok', message: 'API gateway is healthy' };
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const originalPath = req.originalUrl.split('?')[0];
    const apiPrefix = '/api';

    if (!originalPath.startsWith(apiPrefix)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const routedPath = originalPath.slice(apiPrefix.length);
    const pathSegments = routedPath.split('/').filter(Boolean);
    const service = pathSegments[0];

    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const targetBase = SERVICE_MAP[service];
    if (!targetBase) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const forwardedPath = `/${pathSegments.join('/')}`;
    const queryString = req.originalUrl.includes('?') ? `?${req.originalUrl.split('?')[1]}` : '';
    const targetUrl = `${targetBase}${forwardedPath}${queryString}`;

    console.log(`[Gateway] ${req.method} ${req.originalUrl} -> ${targetUrl}`);
  
    const headers = { ...req.headers } as Record<string, string>;
    delete headers.host;
    delete headers['content-length'];

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const body = hasBody && req.body ? JSON.stringify(req.body) : undefined;
    if (hasBody && body && !headers['content-type']) {
      headers['content-type'] = 'application/json';
    }

    const fetchFn = (globalThis as any).fetch;
    if (!fetchFn) {
      throw new HttpException('Fetch API is not available in this runtime', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const response = await fetchFn(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
    });

    response.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() === 'transfer-encoding' || key.toLowerCase() === 'content-length') {
        return;
      }
      res.setHeader(key, value);
    });

    const responseBody = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(responseBody));
  }
}
