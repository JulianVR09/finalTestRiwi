import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { GenericService } from '../common/services/generic.service';

@Injectable()
export class TournamentService extends GenericService<Tournament> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>
  ) {
    super(tournamentRepository);
  }

  async createTournament(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return await super.create(createTournamentDto)
  }

  async findAllTournaments(): Promise<Tournament[]> {
    return await this.tournamentRepository.find();
  }

  async findTournamentById(id: string): Promise<Tournament> {
    return await this.tournamentRepository.findOne({ where: { id } });
  }

  async updateTournament(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    return await super.update(id, updateTournamentDto);
  }

  async deleteTournament(id: string): Promise<Tournament> {
    return await super.delete(id);
  }
}
