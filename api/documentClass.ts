import $unAuthApi from "../config/unAuthApi";
import { PaginateWithGeneric } from "../helper/paginate";
import Api from "./api";

export interface DocumentItem {
  id: number;
  title: string;
  text: string;
  file: string;
}
class DocumentClass extends Api {
  async getDocuments(): Promise<PaginateWithGeneric<DocumentItem>> {
    const response = await $unAuthApi("/form");
    this.LogResponse("getDocument", response);
    return response.data;
  }

  protected extname(url: string): string {
    const array = url.split(".");
    return array[1];
  }

  protected basename(url: string): string {
    const array = url.split("/");
    return array[array.length - 1];
  }

  openDocument(url: string): void {
    console.log("Open document...");
    const file_extension = this.extname(url);
    console.log("File: ", this.basename(url));
    if (file_extension == "pdf") {
      window.open(url, "", "_blank");
    } else {
      window.electronAPI.sendTemp(url, file_extension, this.basename(url));
    }
  }
}

export default new DocumentClass();
