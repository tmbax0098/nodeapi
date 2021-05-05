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

    getRole = (req: Request) => {

        try {
            let role : string | undefined = req.headers.role as string;
            if(role=== undefined){
                role = EnumRoles.guest.toString();
            }
            return parseInt(role);
        } catch {
            return EnumRoles.guest;
        }

    }

    isTechnical: ApiRequest = (req, res, next) => {
        if (this.getRole(req) <= EnumRoles.technical) {
            return next();
        }
        this.accessDenied(res, {});
    }

    isAdmin: ApiRequest = (req, res, next) => {
        if (this.getRole(req) <= EnumRoles.admin) {
            return next();
        }
        this.accessDenied(res, {});
    }

    isUser: ApiRequest = (req, res, next) => {
        if (this.getRole(req) <= EnumRoles.user) {
            return next();
        }
        this.accessDenied(res, {});
    }

    isSuperMember: ApiRequest = (req, res, next) => {
        if (this.getRole(req) <= EnumRoles.superMember) {
            return next();
        }
        this.accessDenied(res, {});
    }

    isMember: ApiRequest = (req, res, next) => {
        if (this.getRole(req) <= EnumRoles.member) {
            return next();
        }
        // console.log("role is guest");
        this.accessDenied(res, {});
    }

    isGuest: ApiRequest = (req, res, next) => {
        if (this.getRole(req) === EnumRoles.guest) {
            return next();
        }
        this.accessDenied(res, {});
    }

    onlyUser: ApiRequest = async (req, res, next) => {
        if (!req.headers.role || parseInt(req.headers.role as string) > EnumRoles.user) {
            return this.accessDenied(res, {});
        }
        next();
    }

}

export default new RoleController();
