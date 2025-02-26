import { Role } from '@prisma/client';
import { ITraceable } from 'src/common/interfaces/traceable';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User implements ITraceable {
  id: string;
  @ApiProperty({
    description: 'The name of the user',
    example: 'User Name',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    example: 'MEMBER',
  })
  role: Role;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
