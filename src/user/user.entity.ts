import { Entity, Column, PrimaryColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { v4 as uuidV4 } from 'uuid'

import { Role } from './enums/role.enum'

@Entity('app_user')
export class UserEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    unique: true,
    comment: '用户编号'
  })
  id: string

  @BeforeInsert()
  updateId(): void {
    this.id = uuidV4()
  }

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '用户名'
  })
  username: string

  @Column({
    type: 'varchar',
    length: 200,
    comment: '密码'
  })
  @Exclude()
  password: string

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '邮箱'
  })
  email: string

  @Column({
    comment: '昵称'
  })
  nickname: string

  @Column({
    type: 'simple-enum',
    enum: Role,
    default: Role.User,
    comment: '角色身份'
  })
  role: Role

  @Column({
    default: true,
    comment: '用户状态'
  })
  isActive: boolean

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间'
  })
  createdTime: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '更新时间'
  })
  updatedTime: Date
}
