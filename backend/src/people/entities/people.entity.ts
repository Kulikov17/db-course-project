import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from 'typeorm';
import { Ts } from '../../ts/entities/ts.entity';

@Entity('people')
export class People {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column()
    surname: String;

    @Column()
    name: String;

    @Column({ nullable: true })
    patronymic: String;

    @Column()
    sex: String;

    @Column({ type: 'date' })
    birthdate: String;

    @Column({ unique: true })
    passport: String;

    @Column({ nullable: true })
    driverLicense: String;

    @OneToMany(type => Ts, ts => ts.owner, { nullable: false }) 
    ts: Ts[];
}