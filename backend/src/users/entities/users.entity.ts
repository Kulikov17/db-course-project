import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: String;

    @Column({ nullable: false })
    password: String;

    @Column({ nullable: false })
    role: String;
}