import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserTournamentDto {
    @IsString()
    userId: string;

    @IsString()
    tournamentId: string;

    @IsNumber()
    @IsOptional()
    points?: number
}
