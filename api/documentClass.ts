import $unAuthApi from "../config/unAuthApi"
import Api from "./api";
import {shell, dialog, ipcRenderer} from "electron"


export interface DocumentItem {
    id: number,
    title: string,
    text: string,
    file: string
}
class DocumentClass extends Api { 
    async getDocuments(): Promise<DocumentItem[]> {
        const response  = await $unAuthApi("/form");
        this.LogResponse("getDocument", response)
        return response.data;
    }

    openDocument() {
        console.log("cl")
        // ipcRenderer.send("temp");
    }
}

export default new DocumentClass