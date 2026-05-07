# Google Ads Admin Automation Backend

NestJS backend for Google Ads automation admin panel with MySQL database.

## Features
- User authentication with JWT
- Admin users management (create, list, update, delete)
- Advertiser management
- Campaign CRUD with campaign details, preview URL, and tracking URL
- MySQL database with TypeORM
- Environment-based configuration

## Prerequisites
- Node.js (v18+)
- MySQL database

## Database Setup
1. Create a MySQL database named `google_ads_admin`
2. Run the schema file to create tables:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS google_ads_admin;"
mysql -u root -p google_ads_admin < schema.sql
```

Or manually execute the SQL commands in `schema.sql`

## Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the database credentials in `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=google_ads_admin
JWT_SECRET=your_jwt_secret_here
```

## Run locally
1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run start:dev
```

3. API endpoints:

- Health check: `GET http://localhost:3001/`
- Users: `http://localhost:3001/api/users`
- Advertisers: `http://localhost:3001/api/advertisers`
- Campaigns: `http://localhost:3001/api/campaigns`
- Auth: `http://localhost:3001/api/auth/login`

## Database Tables
- `user` - Admin and advertiser users
- `advertiser` - Advertising clients
- `campaign` - Campaign configurations

## Project structure
- `src/app.module.ts` - Main application module with database config
- `src/users` - Users controller/service/entities/DTOs
- `src/advertisers` - Advertisers controller/service/entities/DTOs
- `src/campaigns` - Campaigns controller/service/entities/DTOs
- `src/auth` - Authentication with JWT
- `schema.sql` - Database schema and sample data
- `.env.example` - Environment variables template
