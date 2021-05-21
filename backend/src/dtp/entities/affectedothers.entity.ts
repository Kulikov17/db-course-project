import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Dtp } from './dtp.entity';

@Entity('affectedothers')
export class AffectedOthers {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column()
    type: String;
    
    @ManyToOne(type => People, person => person.id)
    @JoinColumn() 
    person: People;

    @ManyToOne(type => Dtp, dtp => dtp.affectedothers) 
    @JoinColumn()
    dtp: Dtp;

    @Column()
    health: String;
    
    @Column()
    guilt: String;
}