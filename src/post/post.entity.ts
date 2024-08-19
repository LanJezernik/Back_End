import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Subject} from "../subject/subject.entity";

@Entity('posts')
export class Posti {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user) => user.posts,{eager:true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(()=>Subject, (subject) => subject.posts,{eager:true})
    @JoinColumn({name: 'subject_id'})
    subject: Subject;
}