import Controller, {Answer, AnswerData, ApiRequest} from "./Controller";
import User from "../models/User";
import {CallbackError, Error} from "mongoose";
import {cryptoOption, siteAddress} from "../../config";
import {Response, Request, NextFunction} from "express";
import {
    Message_ConfirmFail,
    Message_ConfirmSuccess,
    Message_UserCreated,
    Message_ValidationError,
} from "../tools/Messages";
import {confirmTemplate} from "../tools/ConfirmEmailTemplate";
import UserConfirm from "../models/UserConfirm";
import Token from "../models/Token";
import EnumRoles from "../tools/enums/EnumRoles";
import Account from "../models/Account";

const bcrypt = require("bcrypt");

export default new (class AuthController extends Controller {
    createTechnical: ApiRequest = async (req, res) => {
        this.create(req, res, EnumRoles.technical);
    };
    createAdmin: ApiRequest = async (req, res) => {
        this.create(req, res, EnumRoles.admin);
    };
    createUser: ApiRequest = async (req, res) => {
        this.create(req, res, EnumRoles.user);
    };
    create = async (req: Request, res: Response, role: number) => {
        try {
            let adduser = new User({...req.body});

            let result = await adduser.validate();
            if (result) {
                return this.error(res, result);
            }
            let user = await User.findOne({username: adduser.username});
            if (user) {

                console.log("user is : ", user);

                return this.failMessage(res, "این نام کاربری موجود است");
            }

            adduser.role = role;
            adduser.password = bcrypt.hashSync(
                adduser.password,
                cryptoOption.saltRounds
            );

            // adduser = await adduser.save();
            let addaccount = new Account({user: adduser._id});
            adduser.account = addaccount._id;

            await addaccount.save();
            await adduser.save();

            this.message(res, Message_UserCreated);

            const userConfirm = new UserConfirm({
                username: adduser.username,
                code: Date.now().toString() + "sdfafdasf",
            });

            userConfirm.save((error: any) => {
                const acceptUrl = siteAddress + "/accept/" + userConfirm.code;
                const rejectUrl = siteAddress + "/reject/" + userConfirm.code;
                this.sendMail(
                    adduser.username,
                    "Confirm Email",
                    confirmTemplate(acceptUrl, rejectUrl)
                );
            });
        } catch (e) {
            const packet: AnswerData = {
                data: e,
                message: Message_ValidationError,
            };
            this.error(res, packet)
        }


        // adduser.validate((error: CallbackError) => {
        //     if (error) {
        //         return this.error(res, error);
        //     }
        //
        //
        //     User.findOne(
        //         {username: adduser.username},
        //         (err: CallbackError, findUser: any) => {
        //             if (err) {
        //                 return this.error(res, {
        //                     data: error,
        //                     message: "خطا در ساخت اکانت! لطفا دوباره تلاش کنید",
        //                 });
        //             }
        //             if (findUser) {
        //                 return this.failMessage(res, "این نام کاربری موجود است");
        //             }
        //             adduser.role = role;
        //             adduser.password = bcrypt.hashSync(
        //                 adduser.password,
        //                 cryptoOption.saltRounds
        //             );
        //             adduser.save((error: CallbackError, doc: any) => {
        //                 if (error) {
        //                     packet.data = error.message;
        //                     return this.error(res, packet);
        //                 }
        //                 this.message(res, Message_UserCreated);
        //
        //                 const userConfirm = new UserConfirm({
        //                     username: doc.username,
        //                     code: Date.now().toString() + "sdfafdasf",
        //                 });
        //
        //                 userConfirm.save((error: any) => {
        //                     const acceptUrl = siteAddress + "/accept/" + userConfirm.code;
        //                     const rejectUrl = siteAddress + "/reject/" + userConfirm.code;
        //                     this.sendMail(
        //                         doc.username,
        //                         "Confirm Email",
        //                         confirmTemplate(acceptUrl, rejectUrl)
        //                     );
        //                 });
        //             });
        //         }
        //     );
        // });

    };
    confirmAccept: ApiRequest = (req, res) => {
        const token = req.params.token;

        UserConfirm.findOne({code: token}, async (error: Error, doc: any) => {
            if (error || !doc) {
                this.failMessage(res, Message_ConfirmFail);
            } else {
                // console.log("doc : \n", doc);

                await User.updateOne({username: doc.username}, {confirmed: true});
                await UserConfirm.deleteOne({username: doc.username});
                this.message(res, Message_ConfirmSuccess);
            }
        });
    };
    confirmReject: ApiRequest = (req, res) => {
        const token = req.params.token;

        const userConfirm = UserConfirm.findOne(
            {code: token},
            (error: Error, doc: any) => {
                if (error || !doc) {
                    this.failMessage(res, Message_ConfirmFail);
                } else {
                    User.updateOne({username: userConfirm.username}, {confirm: true});
                    UserConfirm.deleteOne({username: userConfirm.username});
                    this.message(res, Message_ConfirmSuccess);
                }
            }
        );
    };
    login: ApiRequest = async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username: username});
            console.log("user is : ", user);
            if (user) {
                if (!user.confirmed) {
                    return this.fail(res, {
                        data: null,
                        message: "برای فعالسازی اکانت خود به رایانامه خود بروید و لینک ارسالی را تایید نمایید!",
                    });
                }
                if (user.block) {
                    return this.fail(res, {
                        data: null,
                        message: "اکانت شما در دسترس نمی باشد!",
                    });
                }
                bcrypt.compare(
                    password,
                    user.password,
                    (error: any, result: boolean) => {

                        console.log("compare password : ", error, result);

                        if (result) {
                            let token = new Token({
                                value: this.createToken({username: username}),
                            });
                            token.save((err: CallbackError, doc: any) => {
                                if (doc) {
                                    // res.cookies.set
                                    // res.cookie.setCookie('token' , token.value);
                                    res.cookie("token", token.value, {
                                        maxAge: 900000,
                                        httpOnly: true,
                                    });
                                    return this.success(res, {
                                        message: "ورود موفقیت آمیز بود",
                                        data: token.value,
                                    });
                                } else {

                                    return this.fail(res, {
                                        data: null,
                                        message: "نام کاربری یا گذرواژه صحیح نمی باشد!",
                                    });
                                }
                            });
                        } else {
                            return this.fail(res, {
                                data: null,
                                message: "نام کاربری یا گذرواژه صحیح نمی باشد!",
                            });
                        }
                    }
                );
            } else {
                this.failMessage(res, "نام کاربری یا گذرواژه صحیح نمی باشد!");
            }
        } catch (e) {
            this.error(res, {
                data: e,
                message: "Login fail!",
            });
        }
    };
    logout: ApiRequest = async (req, res) => {
        // res.cookie("token", "", {maxAge: 0});
        res.clearCookie("token");
        this.message(res, "خروج موفقیت آمیز بود!");
    };
    validToken: ApiRequest = async (req, res) => {
        try {
            let token = await Token.findOne({token: req.headers.cookie});
            console.log("token ", token);
            this.message(res, "توکن معتبر است");
        } catch (e) {
            this.failMessage(res, "توکن معتبر نمی باشد");
        }
    }

    // all: ApiRequest = (req, res) => {
    //     User.find((err: any, docs: any[]) => {
    //         this.success(res, {
    //             data: docs.map(item => item.transform()),
    //             error: false,
    //             status: true,
    //             message: "All user!"
    //         });
    //     })
    // }
    // allConfirm: ApiRequest = (req, res) => {
    //     UserConfirm.find((err: any, docs: any[]) => {
    //         this.success(res, {
    //             data: docs,
    //             error: false,
    //             status: true,
    //             message: "All user!"
    //         });
    //     })
    // }
})();
