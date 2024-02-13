/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";


export class RoleGuard implements CanActivate {
    private rolePassed: string;
    constructor(role: string) {
        this.rolePassed = role;
    }

    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const req: any = ctx.getRequest();
        return this.rolePassed === req.user.role;
    }
}