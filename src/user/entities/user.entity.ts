import { Role } from "../../common/enums/role.enum";
import { UserTournament } from "../../user-tournament/entities/user-tournament.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ unique: true, nullable: true })
    nickname?: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ select: false, nullable: false })
    password: string;

    @Column({ type: 'enum', default: Role.USER, enum: Role})
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserTournament, (userTournamet) => userTournamet.user)
    userTournament: UserTournament[];
}
