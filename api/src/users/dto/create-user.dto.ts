import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ example: '用户名' })
  name: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail()
  @ApiProperty({ example: '邮箱' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6)
  @MaxLength(16)
  @ApiProperty({ example: '密码' })
  password: string;
}
