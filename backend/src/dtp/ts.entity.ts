import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity('ts1')
export class Ts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @ManyToOne(type => Person, person => person.id) 
    owner: Person;
}