import { AffectedOthers } from 'src/dtp/entities/affectedothers.entity';
import { AffectedDrivers } from 'src/dtp/entities/affecteddrivers.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ts } from '../../ts/entities/ts.entity';

@Entity('people')
export class People {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surname: String;

    @Column()
    name: String;

    @Column({ nullable: true })
    patronymic: String;

    @Column()
    sex: String;

    @Column({ type: 'date' })
    birthdate: String;

    @Column({ unique: true })
    passport: String;

    @Column({ nullable: true })
    driverlicense: String;

    @OneToMany(type => AffectedDrivers, affecteddrivers => affecteddrivers.person) 
    affecteddrivers: AffectedDrivers[];

    @OneToMany(type => AffectedOthers, affectedothers => affectedothers.person) 
    affectedothers: AffectedOthers[];

    @OneToMany(type => Ts, ts => ts.owner, { nullable: false }) 
    ts: Ts[];
}