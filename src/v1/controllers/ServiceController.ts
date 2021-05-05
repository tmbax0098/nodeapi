import {Response, NextFunction, Request} from "express"
import UserService from "../models/UserService";
import Controller, {ApiRequest} from "./Controller";
import EnumService from "./../tools/enums/EnumService";
import IAccount from "../tools/interfaces/IAccount";
import {RoleController} from "./RoleController";

export default new class ServiceController extends RoleController {

    // has(req: Request, res: Response, next: NextFunction, service: number, _id: string | undefined): void {
    //     if (this.isTechnical(req,res,next) || this.isAdmin(req,res,next)) {
    //         return next();
    //     } else {
    //
    //         if (typeof req.headers.services === "string") {
    //             let serv: number = parseInt(req.headers.services);
    //             let sum: number = 0;
    //             let index: number = 0;
    //             let result: boolean = false;
    //             do {
    //                 sum += Math.pow(2, index);
    //                 if (sum + Math.pow(2, index) === serv) {
    //                     result = true;
    //                     break;
    //                 } else {
    //                     index++;
    //                 }
    //
    //             } while (sum < serv);
    //
    //             if (result) {
    //                 next();
    //             } else {
    //                 this.accessDenied(res, {});
    //             }
    //         }
    //
    //     }
    // }

    // accessPoll: ApiRequest = (req, res, next) => {
    //     this.has(req, res, next, EnumService.poll, (req as IAccount)._id);
    // };
    // accessUser: ApiRequest = (req, res, next) => {
    //     this.has(req, res, next, EnumService.user, (req as IAccount)._id);
    // };
    // accessPost: ApiRequest = (req, res, next) => {
    //     this.has(req, res, next, EnumService.post, (req as IAccount)._id);
    // };
    // accessCourse: ApiRequest = (req, res, next) => {
    //     this.has(req, res, next, EnumService.course, (req as IAccount)._id);
    // };
}
