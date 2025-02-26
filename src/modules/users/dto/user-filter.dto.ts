import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserFilterDto {
  @ApiProperty({ required: false, example: 'UserName' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'user@mail.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, enum: Role, example: 'ADMIN' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
