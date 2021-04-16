import {Response, Request, NextFunction} from "express";

const jwt = require('jsonwebtoken');
import {secretKey, siteMail} from "../../config";

const sendmail = require('sendmail')();


export type ApiRequest = (req: Request, res: Response, next: NextFunction) => void;

export type AnswerData = {
    data?: any;
    message?: string;
    status?: boolean;
    error?: boolean;
}

export type Answer = (res: Response, data: AnswerData) => void;
export type AnswerMessage = (res: Response, message: string) => void;

export default class Controller {

    createToken = (data: any): string => {
        console.log("createToken : data =>\n", data)
        return jwt.sign(data, secretKey);
    }

    extractToken = (token: string = "") => {
        return jwt.decode(token);
    }

    sendMail = (to: string, subject: string, html: string) => {
        sendmail({
            from: siteMail,
            to: to,
            subject: subject,
            html: html,
        }, function (err: any, reply: any) {
            console.log(err && err.stack);
            console.dir(reply);
        });
    }

    answer: Answer = (res, data) => {
        res.status(200).json(data);
    }

    success: Answer = (res, data) => {
        data.status = true;
        data.error = false;
        res.status(200).json(data);
    }

    fail: Answer = (res, data) => {
        data.status = false;
        data.error = false;
        res.status(200).json(data);
    }

    error: Answer = (res, data) => {
        data.status = false;
        data.error = true;
        res.status(200).json(data);
    }

    accessDenied: Answer = (res, data = {}) => {

        const info: AnswerData = {
            data: null,
            status: false,
            error: true,
            message: data.message ? data.message : "Access denied!"
        };

        res.status(401).json(info);
    }

    message: AnswerMessage = (res, message) => {
        const answer: AnswerData = {
            data: null,
            message: message,
            status: true,
            error: false
        }
        res.status(200).json(answer);
    }

    debug: ApiRequest = (req, res, next) => {

        console.log("req.url : ", req.url);
        console.log("req.headers : ", req.headers);
        console.log("req.params : ", req.params);
        console.log("req.query : ", req.query);
        console.log("req.body : ", req.body);

        next();
    }

}
