import { Controller, Post, Body, Patch, Param, NotFoundException, Get } from '@nestjs/common';
import { UserTournamentService } from './user-tournament.service';
import { CreateUserTournamentDto } from './dto/create-user-tournament.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserTournamentDto } from './dto/update-user-tournament.dto';
import { UserTournament } from './entities/user-tournament.entity';

@ApiTags('UserTournament')
@Controller('user-tournament')
export class UserTournamentController {
  constructor(private readonly userTournamentService: UserTournamentService) {}

  @Post()
  async create(@Body() createUserTournamentDto: CreateUserTournamentDto) {
    return await this.userTournamentService.createUserTournament(createUserTournamentDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Body() updateUserTournamentDto: UpdateUserTournamentDto): Promise<UserTournament> {
    return await this.userTournamentService.updateUserTournament(id, updateUserTournamentDto);
  }

  @Get(':id')
  async findRanking(@Param('id') id: string): Promise<UserTournament[]> {
    return await this.userTournamentService.findRanking(id);
  }
}
