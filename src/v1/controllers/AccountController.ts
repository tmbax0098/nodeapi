import Controller, {ApiRequest} from "./Controller";
import Account from "../models/Account";
import User from "../models/User";
import {CallbackError} from "mongoose";


export default new class AccountController extends Controller {
    get: ApiRequest = async (req, res) => {
        const {username} = req.headers;

        console.log(req.headers._id);

        let account = await Account.findOne({userId: req.headers._id});
        if (account) {
            return this.success(res, {
                data: account.transform(),
                message: "Account information!"
            })
        } else {
            new Account({userId: req.headers._id}).save((err:CallbackError, doc:any) => {
                if (err) {
                    return this.error(res, {
                        data: err,
                        message: err.message
                    });
                }
                return this.success(res, {
                    data: doc.transform(),
                    message: "Account information!"
                });
            });
        }
    }
    set: ApiRequest = async (req, res) => {
        // const {username} = req.headers;

        const condition = {userId: req.headers._id};
        let account = await Account.findOne(condition);

        if (account) {
            await Account.updateOne(condition, {...req.body});
            return this.message(res, "Account saved!");
        }
        await new Account({...req.body, ...condition}).save();
        return this.message(res, "Account saved!");

    }

    //TODO define profile image api
}