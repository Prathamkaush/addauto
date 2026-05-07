import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './db.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule],
})
export class UsersServiceModule {}
