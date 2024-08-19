import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../common/abstract.service";

@Injectable()
export class UserService extends AbstractService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async update(id, data): Promise<User> {
        await this.userRepository.update(id, data);
        return this.findOne({id});
    }

    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }

    async getAllUsers() : Promise<User>{
        const dataSql = await this.userRepository.query(
            `SELECT * 
            FROM "uporabnik";`
    );
        return dataSql;
    }


}