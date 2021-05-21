import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AffectedDrivers } from '../entities/affecteddrivers.entity';
import { AffectedOthers } from '../entities/affectedothers.entity';
import { Typedtp } from '../entities/typedtp.entity';

@Entity('dtp')
export class Dtp {
    @PrimaryGeneratedColumn()
    dtpId: number;

    @Column({ type: 'date'})
    dateDtp: String;

    @Column({ type: 'time without time zone' })
    timeDtp: String;

    @Column()
    regionDtp: String;

    @Column()
    cityDtp: String;

    @Column({ nullable: true })
    descriptionDtp: String;

    @OneToMany(type => AffectedDrivers, affecteddrivers => affecteddrivers.dtp) 
    affecteddrivers: AffectedDrivers[];

    @OneToMany(type => AffectedOthers, affectedothers => affectedothers.dtp) 
    affectedothers: AffectedDrivers[];

    @ManyToMany(type => Typedtp)
    @JoinTable()
    dt: Typedtp[];
}