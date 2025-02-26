import { ApiProperty } from '@nestjs/swagger';

export class ITraceable {
  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;
  updatedAt: Date;
}
