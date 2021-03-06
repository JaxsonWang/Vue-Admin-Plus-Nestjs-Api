/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：auth.module.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '@/user/user.module'
import { AuthService } from '@/auth/auth.service'
import { BcryptService } from '@/shared/services/bcrypt.service'

import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expired')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
