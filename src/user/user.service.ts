/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.service.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BcryptService } from '@/utils/bcrypt.service'
import { CreateUserDto } from './dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity()
    user.username = createUserDto.username
    user.password = await this.bcryptService.hash(createUserDto.password)
    user.email = createUserDto.email
    user.nickname = createUserDto.nickname

    return this.userRepository.save(user)
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }
  /**
   * 根据登录账号查询
   * @param username
   */
  async findByUsername(username: string): Promise<UserEntity> {
    return (await this.userRepository.findOne({ username })) || null
  }
  /**
   * 根据编码查询
   * @param id
   */
  findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
