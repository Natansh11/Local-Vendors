import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({
    example: 'contribution',
    enum: ['contribution', 'withdrawal', 'loan', 'repayment'],
  })
  @IsEnum(['contribution', 'withdrawal', 'loan', 'repayment'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'Monthly contribution', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  // For loan transactions
  @ApiProperty({ example: '507f1f77bcf86cd799439012', required: false })
  @IsString()
  @IsOptional()
  borrowerId?: string;

  @ApiProperty({ example: '2025-11-09', required: false })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  interestRate?: number;
}
