import { backendUrl, frontendUrl } from "../constants/url";
import Paginate from "../helper/paginate";

export default class Api {
  protected CheckStatus(status: number): boolean {
    return status <= 400;
  }

  protected CheckStatusLessFourHundredCode(status: number) {
    return status < 400;
  }

  protected LogResponse(description: string, response: any): void {
    console.log(`${description} response: `, response);
    console.log(`${description}: `, response?.data);
  }

  protected parseData<T>(data: Paginate, key: string) {
    data.results.forEach((item) => {
      const parser = new DOMParser();
      if (typeof item[key] === "string") {
        const doc = parser.parseFromString(item[key], "text/html");
        const images = doc.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
          console.log("Image: ", images[i]);
          const old_src = images[i].src;
          images[i].src =
            `${backendUrl}/${old_src.replace(frontendUrl + "/", "").replace("file://", "").replace("C:", "")}`;
        }
        item[key] = doc.documentElement.innerHTML;
      } else throw Error(`item[${key}] is null: ${item[key]}`);
    });
    return data;
  }

  protected oneParseData<T extends Record<string, any>>(data: T, key: string): T {
    const parser = new DOMParser();
    if (typeof data[key] == "string") {
      const doc = parser.parseFromString(data[key], "text/html");
      const images = doc.getElementsByTagName("img");
      for (let i = 0; i < images.length; i++) {
        console.log("Image: ", images[i]);
        const old_src = images[i].src;
        images[i].src =
          `${backendUrl}/${old_src.replace(frontendUrl + "/", "").replace("file://", "").replace("C:", "")}`;
      }
      (data as Record<string, any>)[key] = doc.documentElement.innerHTML;
    } else throw new Error(`data[${key}] is null: ${data[key]}`);
    return data;
  }

  public static parseDataStatic<T>(data: Paginate, key: string) {
    return new this().parseData(data, key);
  }

  public static oneParseDataStatic<T>(data: any[], key: string) {
    return new this().oneParseData(data, key);
  }
}
