import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Tournament')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Auth(Role.ADMIN)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  findAll() {
    return this.tournamentService.findAllTournaments();
  }

  @Auth(Role.ADMIN)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentService.findTournamentById(id);
  }

  @Auth(Role.ADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentService.update(id, updateTournamentDto);
  }

  @Auth(Role.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentService.deleteTournament(id);
  }
}
