import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty({
    example: 'approved',
    enum: ['approved', 'rejected', 'completed'],
  })
  @IsEnum(['approved', 'rejected', 'completed'])
  status: string;

  @ApiProperty({ example: 'Insufficient funds', required: false })
  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
