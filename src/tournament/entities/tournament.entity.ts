import { UserTournament } from "../../user-tournament/entities/user-tournament.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    prizePool: string;

    @Column()
    maxParticipants: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserTournament, (userTournament) => userTournament.tournament)
    userTournament: UserTournament[];
}
