import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import IAnswerUser from "../tools/interfaces/IAnswerUser";
import TypeTextValue from "../tools/types/TypeTextValue";

export default new class UserController extends Controller {

    deleteAll: ApiRequest = async (req, res) => {
        await User.deleteMany({});
        this.message(res, "All user deleted!");
    }
    deleteOne: ApiRequest = async (req, res) => {
        await User.deleteOne({_id: req.params.id});
        this.success(res, {
            data: null,
            message: "Item delete successfully!"
        })
    }


    getNames: ApiRequest = async (req, res) => {
        const list = await User.find().select({_id: 1, username: 1});
        this.success(res, {
            error: false,
            status: true,
            data: list.map((item: any) => item.toTextValue()),
            message: "All user text and value!"
        })
    }
    all: ApiRequest = async (req, res) => {
        const list = await User.find();
        this.success(res, {
            error: false,
            status: true,
            data: list.map((item: any) => item.transform()),
            message: "All user!"
        })
    }
    getOne: ApiRequest = async (req, res) => {

        const item = await User.findOne({_id: req.params.id}).populate("account");
        if (item) {
            return this.success(res, {
                error: false,
                status: true,
                data: item as IAnswerUser,
                message: "All user!"
            })
        }

        return this.fail(res, {
            data: null,
            message: "User not found!"
        })
    }
}