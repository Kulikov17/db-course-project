import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Dtp } from './dtp.entity';

@Entity('typedtp')
export class Typedtp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: String;

    @ManyToMany(type => Dtp, dtp => dtp.dt)
    dtp: Dtp[];
}