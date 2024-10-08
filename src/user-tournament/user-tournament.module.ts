import { Module } from '@nestjs/common';
import { UserTournamentService } from './user-tournament.service';
import { UserTournamentController } from './user-tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTournament } from './entities/user-tournament.entity';
import { UserModule } from '../user/user.module';
import { TournamentModule } from '../tournament/tournament.module';

@Module({
  imports:[UserModule,
    TournamentModule,
    TypeOrmModule.forFeature([UserTournament])
  ],
  controllers: [UserTournamentController],
  providers: [UserTournamentService],
})
export class UserTournamentModule {}
