import { Tournament } from "src/tournament/entities/tournament.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserTournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user?: User;

    @Column({nullable: false})
    userId: string;

    @ManyToOne(() => Tournament)
    @JoinColumn({ name: 'tournamentId', referencedColumnName: 'id' })
    tournament: Tournament;

    @Column({nullable: false})
    tournamentId: string;

    @Column({nullable: true, default: 0})
    points?: number

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}
