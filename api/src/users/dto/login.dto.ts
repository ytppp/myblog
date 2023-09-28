import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail()
  @ApiProperty({ example: '邮箱' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  @ApiProperty({ example: '密码' })
  password: string;
}
