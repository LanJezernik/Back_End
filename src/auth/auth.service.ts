import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";
import {Response, Request} from "express";
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersService: UserService,
        private configService: ConfigService,
    ){}

    getCookiesForSignOut():string[]{
        return['jwt=; HttpOnly; Path=/; Max-Age=0','refresh_token=; HttpOnly; Path=/; Max-Age=0']
    }
    async logout(userId: string, res: Response): Promise<void> {
        const user = await this.usersService.findById(userId)
        await this.usersService.update(user.id, {refresh_token: null})
        try {
            res.setHeader('Set-Cookie', this.getCookiesForSignOut()).sendStatus(200)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Something went wrong while setting cookies into response header.')
        }
    }

    async user(cookie: string): Promise<User> {
        const data = await this.jwtService.verifyAsync(cookie)
        return this.usersService.findById(data['id'])
    }

    async getUserId(request: Request): Promise<string> {
        const user = request.user as User
        return user.id
    }

}
