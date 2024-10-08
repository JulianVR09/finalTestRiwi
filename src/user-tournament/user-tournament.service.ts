import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTournamentDto } from './dto/create-user-tournament.dto';
import { GenericService } from '../common/services/generic.service';
import { UserTournament } from './entities/user-tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { UpdateUserTournamentDto } from './dto/update-user-tournament.dto';

@Injectable()
export class UserTournamentService extends GenericService<UserTournament> {
  constructor(
    @InjectRepository(UserTournament)
    private readonly userTournamentRepository: Repository<UserTournament>,
    private readonly tournamentService: TournamentService,
    private readonly userService: UserService,
  ) {
    super(userTournamentRepository);
  }

  async createUserTournament(createUserTournament: CreateUserTournamentDto ): Promise<UserTournament> {
    const { userId, tournamentId } = createUserTournament;

    const tournament = await this.tournamentService.findTournamentById(tournamentId)
    if (!tournament) throw new NotFoundException('Tournament not found');

    const user = await this.userService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    
    const userTournament = this.userTournamentRepository.create(createUserTournament)
    return await this.userTournamentRepository.save(userTournament)
  }

  async updateUserTournament(id: string, updateUserTournamentDto: UpdateUserTournamentDto): Promise<UserTournament> {
    const { userId, points } = updateUserTournamentDto;
    
    const user = await this.userService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.userTournamentRepository.update(id, {
      points: points,
    });

    return await this.userTournamentRepository.findOne({ where: { id } });
  }

  async findRanking(id: string): Promise<UserTournament[]>{
    const userTournaments = await this.userTournamentRepository.find({
      where: { tournamentId: id },
      order: { points: 'DESC' },
    });
    return userTournaments;
  }
}
