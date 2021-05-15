import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';
import { Ts } from './ts.entity';
import { Dtp } from './dtp.entity';

@Entity('affecteddrivers')
export class Affecteddrivers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Person, person => person.id) 
    person: Person;

    @ManyToOne(type => Dtp, dtp => dtp.affecteddrivers) 
    dtpid: Dtp;

   // @OneToOne(type => Ts)
   // @JoinColumn()
   // ts: Ts;
}