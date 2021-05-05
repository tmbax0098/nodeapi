import Poll from "../models/Poll";
import Question from "../models/Question";
import Controller, {Answer, AnswerData, ApiRequest} from "./Controller";
import User from "../models/User";
import IAnswerUser from "../tools/interfaces/IAnswerUser";
import ITable from "../tools/interfaces/ITable";
import {CallbackError} from "mongoose";
import Participant from "../models/Participant";

export default new (class PollController extends Controller {


    // deleteAll: ApiRequest = async (req, res) => {
    //     await User.deleteMany({});
    //     this.message(res, "All user deleted!");
    // }
    // delete: ApiRequest = async (req, res) => {
    //     await User.deleteOne({_id: req.params.id});
    //     this.success(res, {
    //         data: null,
    //         message: "Item delete successfully!"
    //     })
    // }
    //
    // removeAll: ApiRequest = async (req, res) => {
    //     await User.updateMany({}, {deleted: true});
    //     this.message(res, "All user deleted!");
    // }
    // remove: ApiRequest = async (req, res) => {
    //     await User.updateOne({_id: req.params.id}, {deleted: true});
    //     this.success(res, {
    //         data: null,
    //         message: "Item delete successfully!"
    //     })
    // }

    names: ApiRequest = async (req, res) => {
        const list = await Poll.find().select({_id: 1, title: 1});
        this.success(res, {
            error: false,
            status: true,
            data: list.map((item: any) => item.toTextValue()),
            message: "All user text and value!"
        })
    }
    all: ApiRequest = async (req, res) => {
        const list = await Poll.find();

        this.success(res, {
            error: false,
            status: true,
            data: list.map((item: any) => item.transform()),
            message: "All user!"
        })
    }
    one: ApiRequest = async (req, res) => {
        const {id} = req.params;
        const item = await User.findOne({_id: id}).populate("account");
        if (item) {
            return this.success(res, {
                data: item as IAnswerUser,
                message: "Done successfully!"
            })
        }

        return this.fail(res, {
            data: null,
            message: "Poll not found!"
        })
    }

    // table: ApiRequest = async (req, res) => {
    //
    //     const params = req.params as object as ITable;
    //
    //     const condition: object = {
    //         "username": {
    //             "$regex": params.searchWord,
    //             "$options": "i"
    //         }
    //     };
    //
    //     const list = await User.find(condition)
    //         .skip(params.pageNumber * params.pageSize)
    //         .limit(params.pageSize)
    //         .select({password: 0})
    //
    //     this.success(res, {
    //         error: false,
    //         status: true,
    //         data: list.map((item: any) => item.transform()),
    //         message: "All user!"
    //     })
    // }


    create: ApiRequest = async (req, res) => {

        let newPoll = new Poll(req.body);
        newPoll.validate((error: CallbackError) => {
            if (error) {
                return this.error(res, {data: error})
            }

            newPoll.save((error: CallbackError) => {
                if (error) {
                    return this.error(res, {data: error})
                }
                new Participant({
                    userId: req.headers._id,
                    pollId: newPoll._id
                }).save((err: CallbackError) => {
                    if (err) {
                        return this.error(res, {data: error})
                    }
                    this.success(res, {
                        error: false,
                        status: true,
                        data: newPoll as IPoll,
                        message: "Poll created!"
                    })
                })
            })

        })


    }


})();
