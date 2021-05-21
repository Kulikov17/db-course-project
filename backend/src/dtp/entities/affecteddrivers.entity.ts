import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Ts } from '../../ts/entities/ts.entity';
import { Dtp } from './dtp.entity';

@Entity('affecteddrivers')
export class AffectedDrivers {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column()
    type: String;

    @ManyToOne(type => People, person => person.id)
    @JoinColumn() 
    person: People;

    @ManyToOne(type => Dtp, dtp => dtp.affecteddrivers) 
    @JoinColumn()
    dtp: Dtp;

    @OneToOne(type => Ts)
    @JoinColumn()
    ts: Ts;

    @Column()
    health: String;

    @Column()
    guilt: String;
}