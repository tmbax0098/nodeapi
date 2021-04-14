import Controller, {Answer, AnswerData, ApiRequest} from "./Controller";
import User from "../models/User";
import {CallbackError, Error} from "mongoose";
import IAnswerUser from "../interfaces/IAnswerUser";
import {cryptoOption} from "../../config";

const bcrypt = require('bcrypt');

export class AuthController extends Controller {

    create: ApiRequest = (req, res) => {
        let adduser = new User({...req.body});
        const packet: AnswerData = {
            data: null,
            message: "Validation Error!",
            error: true,
            status: false,
        }

        adduser.validate((error: CallbackError) => {
            if (error) {
                packet.data = error.message;
                return this.error(res, packet);
            }
            adduser.password = bcrypt.hashSync(adduser.password, cryptoOption.saltRounds);
            adduser.save((error1: CallbackError, doc: any) => {
                if (error1) {
                    packet.data = error1.message;
                    return this.error(res, packet);
                }
                console.log("doc : \n", doc);
                packet.status = true;
                packet.error = false;
                packet.message = "User created!"
                // delete doc.password;
                packet.data = doc;
                return this.success(res, packet);
            });
        })
    }

    all: ApiRequest = (req, res) => {
        User.find((err: any, docs: any[]) => {
            this.success(res, {
                data: docs.map(item => item.transform()),
                error: false,
                status: true,
                message: "All user!"
            });
        })
    }
}

export default new AuthController();
