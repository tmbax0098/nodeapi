import Controller, {ApiRequest} from "./Controller";
import Account from "../models/Account";
import User from "../models/User";
import {CallbackError} from "mongoose";

import mkdirp from "mkdirp";
import multer from "multer";
import fs from "fs";
import path from "path";

const dirAvatars = "public/avatars";

const storageAvatar = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        console.log("dir : ", dirAvatars);
        cb(null, dirAvatars);
    },
    filename: (req: any, file: any, cb: any) => {
        console.log("req.file : ", file);

        if (!fs.existsSync(dirAvatars + "/" + file.originalname)) {
            console.log("file not exist  : ", dirAvatars + "/" + file.originalname);
            cb(null, file.originalname);
        } else {
            console.log("file exist  : ", dirAvatars + "/" + file.originalname);
            cb(null, Date.now() + "-" + file.originalname);
        }
    },
});

export const uploadAvatar = multer({
    storage: storageAvatar,
    limits: {
        fieldSize: 3000,
        fieldNameSize: 50,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.toLowerCase() == "image/png" ||
            file.mimetype.toLowerCase() == "image/jpg" ||
            file.mimetype.toLowerCase() == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

export default new (class AccountController extends Controller {
    get: ApiRequest = async (req, res) => {
        const {_id} = req.headers;

        let account = await Account.findOne({userId: req.headers._id});
        if (account) {
            return this.success(res, {
                data: {
                    ...account.transform(),
                    username: req.headers.username,
                    displayName: req.headers.displayName,
                },
                message: "اطلاعات اکانت!",
            });
        } else {
            new Account({userId: req.headers._id}).save(
                (err: CallbackError, doc: any) => {
                    if (err) {
                        return this.error(res, err);
                    }
                    return this.success(res, {
                        data: doc.transform(),
                        message: "اطلاعات اکانت",
                    });
                }
            );
        }
    };
    set: ApiRequest = async (req, res) => {

        const condition = {userId: req.headers._id};
        let account = await Account.findOne(condition);

        if (account) {
            await Account.updateOne(condition, {...req.body});
            return this.message(res, "اطلاعات اکانت ذخیره شد");
        }
        await new Account({...req.body, ...condition}).save();
        return this.message(res, "اطلاعات اکانت ذخیره شد");
    };

    saveAvatar: ApiRequest = async (req, res: any) => {

        this.tryAndManageInternalError(res, async () => {
            const file = req.file;
            if (!file) {
                this.failMessage(res, "تصویر پروفایل را انتخاب کنید!");
            } else {
                console.log("id  is : ", req.headers._id);

                let account = await Account.findOne({userId: req.headers._id});
                console.log("account  is : ", account);
                const url = dirAvatars + "/" + res.req.file.filename;
                if (account) {
                    account.avatar = url;
                    account.save();
                    return this.success(res, {
                        data: url,
                        message: "تصویر پروفایل با موفقیت ذخیره شد",
                    });
                } else {
                    let newAccount = new Account({
                        userId: req.headers._id,
                        avatar: url,
                    });
                    newAccount.save((err: any) => {
                        if (err) {
                            return this.error(res, {message: err.message});
                        }
                        User.updateOne(
                            {_id: req.headers._id},
                            {accountId: newAccount._id},
                            {},
                            (err: any) => {
                                if (err) {
                                    return this.error(res, {message: err.message});
                                }

                                return this.success(res, {
                                    data: url,
                                    message: "تصویر پروفایل با موفقیت ذخیره شد",
                                });
                            }
                        );
                    });
                }
                return this.failMessage(res, "خطا در آپلود عکس");
            }
        })

    };

    takeAvatar: ApiRequest = async (req, res) => {
        console.log("inja hastim ----------------------------------");
        let account = await Account.findOne({userId: req.headers._id});
        if (account) {
            console.log("Download");
            res.download(account.avatar);
        } else {
            console.log("End");

            res.end();
        }
    };

    //TODO define profile image api
})();
