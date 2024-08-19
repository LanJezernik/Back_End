import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {
    }

    @Get('vsi')
    all() {
        return this.userService.all();
    }

    @Get('profile')
    async profile(@Req() request: Request) {
        const token = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(token);

        return this.userService.findOne({id: data.id});
    }

    @Post('user')
    create (@Body() data): Promise<User> {
        return this.userService.create(data);
    }

    @Get(':id')
    getUserById(@Param('id') id: string) : Promise<User> {
        return this.userService.findById(id);
    }

    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() data
    ) : Promise<User> {
        return await this.userService.update(id,data);
    }

    @Delete(':id')
    delete(@Param('id') id:number) : Promise<any> {
        return this.userService.delete(id);
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getUsers(): Promise<User> {
        return this.userService.getAllUsers();
    }
}
