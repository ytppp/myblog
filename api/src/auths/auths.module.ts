import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),
    UsersModule,
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy],
})
export class AuthsModule {}
