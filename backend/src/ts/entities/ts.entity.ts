import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { People } from '../../people/entities/people.entity';

@Entity('ts')
export class Ts {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column()
    type: String;

    @Column({ nullable: true })
    brand: String;

    @Column({ nullable: true })
    model: String;

    @Column({ nullable: true })
    color: String;

    @Column({ unique: true })
    registerNumber: String;

    @Column({'name': 'ownerId'})
    @ManyToOne(type => People, person => person.id) 
    owner: number;
}