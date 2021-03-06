/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.module.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CaslAbilityFactory } from '@/casl/casl-ability.factory'
import { BcryptService } from '@/shared/services/bcrypt.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from '@/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, BcryptService, CaslAbilityFactory],
  exports: [UserService]
})
export class UserModule {}
