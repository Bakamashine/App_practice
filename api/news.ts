import $unAuthApi from "../config/unAuthApi";
import { backendUrl, frontendUrl } from "../constants/url";

export interface NewsItem {
  id: number;
  title: string;
  text: string;
  date: string;
}
class NewsApi {
  getData = async (): Promise<NewsItem[]> => {
    const response = await $unAuthApi.get("/news");
    console.log("News: ", response.data);
    return response.data;
  };

  parseData(data: NewsItem[]): NewsItem[] {
    data.forEach((item) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(item.text, "text/html");
      let images = doc.getElementsByTagName("img");
      for (let i = 0; i < images.length; i++) {
        console.log("Image: ", images[i]);
        let old_src = images[i].src;
        images[i].src =
          `${backendUrl}/${old_src.replace(frontendUrl + "/", "")}`;
      }
      item.text = doc.documentElement.innerHTML;
    });
    return data;
  }
}

export default new NewsApi();
