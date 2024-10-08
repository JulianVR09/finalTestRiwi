import { PartialType } from '@nestjs/swagger';
import { CreateUserTournamentDto } from './create-user-tournament.dto';

export class UpdateUserTournamentDto extends PartialType(CreateUserTournamentDto) {}
