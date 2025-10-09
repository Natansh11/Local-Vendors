import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('groups')
@Controller('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({ status: 201, description: 'Group created successfully' })
  create(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    return this.groupsService.create(createGroupDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups (user is a member of)' })
  findAll(@Request() req, @Query('all') all?: string) {
    const userId = all === 'true' ? undefined : req.user.userId;
    return this.groupsService.findAll(userId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search groups by name or description' })
  search(@Query('q') query: string) {
    return this.groupsService.searchGroups(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group details' })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group (admin only)' })
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Request() req,
  ) {
    return this.groupsService.update(id, updateGroupDto, req.user.userId);
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Join a group' })
  @ApiResponse({ status: 200, description: 'Successfully joined the group' })
  joinGroup(@Param('id') id: string, @Request() req) {
    return this.groupsService.joinGroup(id, req.user.userId);
  }

  @Post(':id/leave')
  @ApiOperation({ summary: 'Leave a group' })
  @ApiResponse({ status: 200, description: 'Successfully left the group' })
  leaveGroup(@Param('id') id: string, @Request() req) {
    return this.groupsService.leaveGroup(id, req.user.userId);
  }
}
