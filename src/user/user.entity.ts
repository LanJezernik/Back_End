import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Posti} from "../post/post.entity";
import { Expose } from "class-transformer";

@Entity('uporabnik')
export class User {

    @PrimaryGeneratedColumn()
    @Expose()
    id: string;

    @Column()
    ime: string;

    @Column()
    priimek: string;

    @Column({unique:true})
    email: string;

    @Column()
    geslo: string;

    @OneToMany(()=>Posti,(post)=>post.user)
    posts: Posti[];
}