import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyVendorDto {
  @ApiProperty({ example: 'VNDR-123456' })
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class ApproveVendorDto {
  @ApiProperty({ example: 'VNDR-123456' })
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ApiProperty({ example: 'admin-user-id' })
  @IsNotEmpty()
  @IsString()
  adminId: string;
}

export class RejectVendorDto {
  @ApiProperty({ example: 'VNDR-123456' })
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ApiProperty({ example: 'Incomplete documents' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ example: 'admin-user-id' })
  @IsNotEmpty()
  @IsString()
  adminId: string;
}
