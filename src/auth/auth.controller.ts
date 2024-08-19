import {
    BadRequestException,
    Body,
    Controller, Get, HttpCode, HttpStatus,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./login.dto";
import {JwtService} from "@nestjs/jwt";
import {Response, Request,} from 'express';
import {AuthGuard} from "./auth.guard";
import {JwtAuthGuard} from "../guards/jwt.guard";
import { AuthService } from './auth.service';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';


@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
                ) {
    }

    @Post('register')
    async register(@Body() data: RegisterDto) {
        const hashed = await bcrypt.hash(data.geslo,12);
        return this.userService.create({
            ime: data.ime,
            priimek: data.priimek,
            email: data.email,
            geslo: hashed,
        });

    }


    @Post('login')
    async login(@Body() data: LoginDto,
                @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOne({email: data.email});
        if (!user) {
            throw new NotFoundException('Uporabnik ne obstaja');
        }

        if (!await bcrypt.compare(data.geslo,user.geslo)) {
            throw new BadRequestException('Napačno geslo');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt',jwt,{httpOnly:true});
        return user;
    }

    /*@UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }
     */

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @HttpCode(HttpStatus.OK)
    async user(@Req() req: Request){
      const id = await this.authService.getUserId(req)
      return this.userService.findById(id)
      /*
       const cookie = req.cookies['access_token']
       return this.authService.user(cookie)*/
    }
}
