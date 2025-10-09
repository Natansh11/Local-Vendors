import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty({ example: 'active', required: false })
  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status?: string;
}
