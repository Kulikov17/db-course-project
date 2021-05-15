import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Affecteddrivers } from './affecteddrivers.entity';
import { Typedtp } from './typedtp.entity';

@Entity('dtp')
export class Dtp {
    @PrimaryGeneratedColumn()
    dtpId: number;

    @Column()
    dtpCity: String;

    @OneToMany(type => Affecteddrivers, affecteddrivers => affecteddrivers.dtpid) 
    affecteddrivers: Affecteddrivers[];

    @ManyToMany(type => Typedtp)
    @JoinTable()
    dt: Typedtp[];

}