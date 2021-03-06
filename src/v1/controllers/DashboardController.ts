import Controller, {ApiRequest} from "./Controller";
import User from "../models/User";
import IAnswerUser from "../tools/interfaces/IAnswerUser";

export default new class DashboardController extends Controller {

    dashboard: ApiRequest = async (req, res) => {

        this.success(res, {
            message : "اطلاعات داشبورد",
            data: {
                cards: [
                    {
                        text: "Users",
                        value: 10,
                        color: "#ff0000",
                        icon: "faAngleRight",
                        description : "jsad fdsf dsafjd aj i gfa wfjaw hfdsaf "
                    }
                ]
            }
        })

    }

}
