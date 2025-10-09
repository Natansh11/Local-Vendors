import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Women Entrepreneurs Group' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Supporting women-led businesses in the community',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minContribution?: number;

  @ApiProperty({ example: 50000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxLoanAmount?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  requireApproval?: boolean;

  @ApiProperty({ example: ['microfinance', 'women'], required: false })
  @IsOptional()
  tags?: string[];
}
