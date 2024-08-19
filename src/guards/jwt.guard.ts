import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super()
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const access_token: string = request.cookies['access_token']
        console.log(access_token)
        try {
            if (!access_token || !!!this.jwtService.verify(access_token)) {
                // return Forbidden error
                return false
            }
            return super.canActivate(context)
        } catch (error) {
            console.log(error)
            throw new ForbiddenException()
        }
    }
}