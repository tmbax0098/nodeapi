import {Response, Request, NextFunction} from "express";

const jwt = require('jsonwebtoken');
import {secretKey, siteMail} from "../../config";

const sendmail = require('sendmail')();


export type ApiRequest = (req: Request, res: Response, next: NextFunction) => void;

export type AnswerData = {
    data: any;
    message: string;
}

export type Answer = (res: Response, data: AnswerData) => void;
export type AnswerMessage = (res: Response, message: string) => void;
export type AnswerError = (res: Response, error: any) => void;

export default class Controller {

    tryAndManageInternalError = async (res: Response, method: any) => {
        try {
            method();
        } catch (e) {
            this.error500(res, {
                message: e.message,
                data: e
            })
        }
    }

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


    private _sendResponse = (res: Response, code: number, data: AnswerData) => {
        res.status(code).json(data);
    }

    answer: Answer = (res, data) => {
        this._sendResponse(res, 200, data);
    }

    success: Answer = (res, data) => {
        this._sendResponse(res, 200, data);
    }

    fail: Answer = (res, data = {message: "", data: null}) => {
        this._sendResponse(res, 600, data);
    }
    failMessage: AnswerMessage = (res, message) => {
        this._sendResponse(res, 200, {
            data: null,
            message: message
        });
    }

    error: AnswerError = (res, error: any = {message: ""}) => {
        this._sendResponse(res, 601, {
            data: error,
            message: error.message
        });
    }
    error500: AnswerError = (res, data) => {
        res.statusMessage = data.message;
        res.status(500).json(data);
    }

    accessDenied: AnswerMessage = (res, message: string) => {
        this._sendResponse(res, 401, {
            data: null,
            message: message
        });
    }

    message: AnswerMessage = (res, message) => {
        this._sendResponse(res, 200, {
            data: null,
            message: message
        });
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
