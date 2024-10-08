import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    AuthModule
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
  exports: [TournamentService],
 
})
export class TournamentModule {}
