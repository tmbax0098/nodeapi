import Controller, {ApiRequest} from "./Controller";
import Account from "../models/Account";
import User from "../models/User";


export default new class AccountController extends Controller {
    get: ApiRequest = async (req, res) => {

        const {username} = req.headers;

        User.findOne({username: username})
            .populate("Account")
            .exec((error: any, user: any) => {
                if (user) {
                    this.success(res, {
                        data: user.account,
                        message: "User account!"
                    })
                } else if (error) {
                    this.error(res, {
                        data: error,
                        message: "Error"
                    })
                } else {
                    this.fail(res, {
                        data: null,
                        message: "User is not exist!"
                    })
                }
            })
    }
}