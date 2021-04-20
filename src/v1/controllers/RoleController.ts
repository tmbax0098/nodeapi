import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import EnumRoles from "../tools/enums/EnumRoles";
import Token from "../models/Token";
import {Request} from "express";
import validator from "validator";
import isJWT = validator.isJWT;

export class RoleController extends Controller {

    decodeToken: ApiRequest = async (req, res, next) => {

        let userToken: string = "";
        if (req.cookies.token && req.cookies.token !== "") {
            userToken = req.cookies.token;
        }
        // else {
        //     userToken =
        //         req.headers.hasOwnProperty("token") ?
        //             req.headers.token :
        //             req.body.hasOwnProperty("token") ?
        //                 req.body.token :
        //                 req.params.hasOwnProperty("token") ?
        //                     req.params.token :
        //                     null;
        // }


        if (isJWT(userToken)) {
            let tokenData = await Token.findOne({value: userToken});
            if (tokenData) {
                const {username} = this.extractToken(userToken);
                const user = await User.findOne({username: username});
                req.headers = {
                    ...req.headers,
                    ...user.toObject()
                }
                next();
            }
        } else {
            next();
        }
    }


    isTechnical(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.technical;
    }

    isAdmin(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.admin;
    }

    isUser(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.user;
    }

    isSuperMember(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.superMember;
    }

    isMember(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.member;
    }

    isAll(req: Request) {
        return !req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.all;
    }


    //TODO here must be complete
    onlyTechnical: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.technical) {
            return this.accessDenied(res, {});
        }
        next();
    }
    onlyAdmin: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) > EnumRoles.admin) {
            return this.accessDenied(res, {});
        }
        next();
    }
    onlyUser: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) > EnumRoles.user) {
            return this.accessDenied(res, {});
        }
        next();
    }
    onlySuperMember: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) > EnumRoles.superMember) {
            return this.accessDenied(res, {});
        }
        next();
    }
    onlyMember: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) > EnumRoles.member) {
            return this.accessDenied(res, {});
        }
        next();
    }
    onlyAll: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) !== EnumRoles.all) {
            return this.accessDenied(res, {});
        }
        next();
    }

    notAll: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) === EnumRoles.all) {
            return this.accessDenied(res, {});
        }
        next();
    }

}

export default new RoleController();