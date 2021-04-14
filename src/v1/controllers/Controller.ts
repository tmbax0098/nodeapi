import {Response, Request, NextFunction} from "express";
import mongoose from "mongoose";


export type ApiRequest = (req: Request, res: Response, next: NextFunction) => void;

export type AnswerData = {
    data: any;
    message: string;
    status: boolean;
    error: boolean;
}

export type Answer = (res: Response, data: AnswerData) => void;

export default class Controller {


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

    accessDenied: Answer = (res) => {

        const info: AnswerData = {
            data: null,
            status: false,
            error: true,
            message: "Access denied!"
        };

        res.status(401).json(info);
    }
}
