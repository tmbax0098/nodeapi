import {Response, NextFunction, Request} from "express"
import UserService from "../models/UserService";
import Controller, {ApiRequest} from "./Controller";
import EnumService from "./../tools/enums/EnumService";
import IAccount from "../tools/interfaces/IAccount";
import {RoleController} from "./RoleController";

export default new class ServiceController extends RoleController {

    has(req: Request, res: Response, next: NextFunction, service: number, _id: string | undefined): void {
        if (this.isTechnical(req) || this.isAdmin(req)) {
            return next();
        } else {
            UserService.find({userId: _id}, (err, serviceList) => {
                if (serviceList.indexOf(service)) {
                    next();
                } else {

                    this.accessDenied(res, {});
                    //TODO here must be complete
                }
            });
        }
    }

    accessPoll: ApiRequest = (req, res, next) => {
        this.has(req, res, next, EnumService.poll, (req as IAccount)._id);
    };
    accessUser: ApiRequest = (req, res, next) => {
        this.has(req, res, next, EnumService.user, (req as IAccount)._id);
    };
    accessPost: ApiRequest = (req, res, next) => {
        this.has(req, res, next, EnumService.post, (req as IAccount)._id);
    };
    accessCourse: ApiRequest = (req, res, next) => {
        this.has(req, res, next, EnumService.course, (req as IAccount)._id);
    };
}
