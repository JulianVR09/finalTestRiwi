import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    prizePool: string;

    @IsNumber()
    maxParticipants: number;
}
