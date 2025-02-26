import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'User Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'username@ex.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role, example: 'MEMBER' })
  @IsEnum(Role)
  role: Role;
}
