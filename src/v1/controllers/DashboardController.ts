import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import IAnswerUser from "../tools/interfaces/IAnswerUser";

export default new class DashboardController extends Controller {

    dashboard: ApiRequest = async (req, res) => {

        this.success(res, {
            data: {
                cards: [
                    {
                        text: "Users",
                        value: 10,
                        color: "#ff0000",
                        icon: "faAngleRight"
                    }
                ]
            }
        })

    }

}
