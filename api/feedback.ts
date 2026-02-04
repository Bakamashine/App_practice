import $AuthApi from "../config/AuthApi";
import Api from "./api";

export interface FeedbackError {
    phone?: string[],
    text?: string[],
}
class Feedback extends Api {
    async sendFeedback(phone: string, text: string): Promise<FeedbackError|void> {
        const response = await $AuthApi.post("/feedback", {
            phone, text
        });
        console.log("Feedback sended result response: ", response);
        console.log("Feedback sended result: ", response.data)
        if (this.CheckStatus(response.status)) {
            return response.data
        }
    }
}

export default new Feedback();