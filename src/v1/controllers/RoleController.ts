import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import EnumRoles from "../tools/enums/EnumRoles";
import Token from "../models/Token";

export default new class RoleController extends Controller {

    decodeToken: ApiRequest = async (req, res, next) => {
        const token: string | null =
            req.headers.hasOwnProperty("token") ?
                req.headers.token :
                req.body.hasOwnProperty("token") ?
                    req.body.token :
                    req.params.hasOwnProperty("token") ?
                        req.params.token :
                        null;
        if (token) {
            let tokenData = await Token.findOne({value: token});
            if (tokenData) {
                const {username} = this.extractToken(token);
                const user = await User.findOne({username: username});
                req.headers = {
                    ...req.headers,
                    ...user.toObject()
                }
                next();
            } else {
                return this.accessDenied(res, {message: "Token is not valid!"});
            }
        } else {
            next();
        }
    }


    //TODO here must be complete
    onlyTechnical: ApiRequest = async (req, res, next) => {
        if (req.headers.role !== EnumRoles.technical + "") {
            return this.accessDenied(res , {});
        }
        next();
    }


}