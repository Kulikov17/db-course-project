import { AffectedDrivers } from 'src/dtp/entities/affecteddrivers.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { People } from '../../people/entities/people.entity';

@Entity('ts')
export class Ts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: String;

    @Column({ nullable: true })
    brand: String;

    @Column({ nullable: true })
    model: String;

    @Column({ nullable: true })
    color: String;

    @Column({ nullable: true })
    registernumber: String;

    @Column({'name': 'ownerId', nullable: true })
    @ManyToOne(type => People, person => person.id) 
    owner: number;

    @OneToMany(type => AffectedDrivers, affecteddrivers => affecteddrivers.ts) 
    affecteddrivers: AffectedDrivers[];
}