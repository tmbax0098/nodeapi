import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import Account from "../models/Account";
import IAnswerUser from "../tools/interfaces/IAnswerUser";
import {QueryOptions} from "mongoose";
import ITable from "../tools/interfaces/ITable";
import {CallbackError} from "mongoose";
import TableParameters from "../tools/types/TableParameters";
import EnumUserFilter from "../tools/enums/EnumUserFilter";


export default new (class UserController extends Controller {

    deleteAll: ApiRequest = async (req, res) => {
        await User.deleteMany({});
        this.message(res, "تمامی کاربران حذف گردیدند");
    };
    delete: ApiRequest = async (req, res) => {
        await User.deleteOne({_id: req.params.id});
        this.success(res, {
            data: null,
            message: "کاربر بصورت کلی حذف گردید",
        });
    };

    removeAll: ApiRequest = async (req, res) => {
        await User.updateMany({}, {deleted: true});
        this.message(res, "تمام کاربران حذف شدند");
    };
    remove: ApiRequest = async (req, res) => {
        await User.updateOne({_id: req.params.id}, {deleted: true});
        this.success(res, {
            data: null,
            message: "کاربر حذف شد",
        });
    };

    names: ApiRequest = async (req, res) => {
        const list = await User.find().select({_id: 1, username: 1});
        this.success(res, {
            data: list.map((item: any) => item.toTextValue()),
            message: "نام و مقدار کاربران",
        });
    };
    all: ApiRequest = async (req, res) => {
        const list = await User.find();
        this.success(res, {
            data: list.map((item: any) => item.transform()),
            message: "لیست کاربران",
        });
    };
    one: ApiRequest = async (req, res) => {
        const item = await User.findOne({_id: req.params.id}).populate("account");
        if (item) {
            return this.success(res, {
                data: item as IAnswerUser,
                message: "کاربر یافت شد",
            });
        }

        return this.fail(res, {
            data: null,
            message: "کاربر یافت نشد",
        });
    };

    edit: ApiRequest = async (req, res) => {
        const editUser = new User({...req.body});
        editUser.validate((error: CallbackError) => {
            if (error) {
                return this.error(res, {message: error.message, data: error});
            }
            const options: QueryOptions = {
                limit: 1,
            };
            User.updateOne(
                {_id: editUser._id},
                {...editUser},
                options,
                (error: CallbackError, doc: any) => {
                    if (error) {
                        return this.error(res, {message: error.message, data: error});
                    }
                    return this.success(res, {
                        data: doc as IAnswerUser,
                        message: "کاربر ویرایش شد",
                    });
                }
            );
            return this.fail(res, {
                data: null,
                message: "کاربر یافت نشد",
            });
        });
    };

    table: ApiRequest = async (req, res) => {
        await this.tryAndManageInternalError(res, async () => {
            const params = req.params as object as TableParameters;

            let condition: any = {};

            if (params.filters) {

                switch (params.filters.searchMode) {
                    case EnumUserFilter.displayName:
                        condition["fullName"] = {
                            $regex: params.filters.searchText,
                            $options: "i",
                        };
                        break;
                    case EnumUserFilter.username:
                        condition["username"] = {
                            $regex: params.filters.searchText,
                            $options: "i",
                        };
                        break;
                    default:
                        break;

                }

                if (params.filters.blocked) {
                    condition["blocked"] = {
                        $regex: params.filters.blocked,
                        $options: "i",
                    }
                }
                if (params.filters.deleted) {
                    condition["deleted"] = {
                        $regex: params.filters.deleted,
                        $options: "i",
                    }
                }
                if (params.filters.role) {
                    condition["role"] = {
                        $regex: params.filters.role,
                        $options: "i",
                    }
                }
                if (params.filters.confirmed) {
                    condition["confirmed"] = {
                        $regex: params.filters.confirmed,
                        $options: "i",
                    }
                }
                if (params.filters.services) {
                    condition["services"] = {
                        $regex: params.filters.services,
                        $options: "i",
                    }
                }
            }


            const list = await User.find(condition)
                .skip(params.page * params.size)
                .limit(params.size)
                .select({password: 0});

            params.list = list.map((item: any) => item.transform());

            this.success(res, {
                data: params,
                message: "جدول کاربران",
            });
        })
    };

})();
