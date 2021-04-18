import Poll from "../models/Poll";
import Question from "../models/Question";
import Controller, { Answer, AnswerData, ApiRequest } from "./Controller";

export default new (class PollController extends Controller {
  get: ApiRequest = async (req, res) => {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    const questions = await Question.find({ pollId: pollId });
    
  };
})();
