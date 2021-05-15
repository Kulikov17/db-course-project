import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Affecteddrivers } from './affecteddrivers.entity';
import { Ts } from './ts.entity';

@Entity('person')
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @OneToMany(type => Affecteddrivers, affecteddrivers => affecteddrivers.person) 
    affecteddriver: Affecteddrivers[];

  //  @OneToMany(type => Ts, ts => ts.owner) 
  //  ts: Ts[];
}