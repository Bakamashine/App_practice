import $unAuthApi from "../config/unAuthApi";
import { backendUrl, frontendUrl } from "../constants/url";
import Api from "./api";

export interface NewsItem {
  id: number;
  title: string;
  text?: string|TrustedHTML;
  date: string;
}
class NewsApi extends Api {
  getData = async (): Promise<NewsItem[]> => {
    const response = await $unAuthApi.get("/news");
    console.log("News: ", response.data);
    return response.data;
  };

  async getById(id: number|string): Promise<NewsItem> {
    const response = await $unAuthApi.get(`/news/${id}`);
    console.log("One news: ", response.data);
    return response.data;
  }

  parseData(data: NewsItem[]): NewsItem[] {
    data.forEach((item) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(item.text, "text/html");
      const images = doc.getElementsByTagName("img");
      for (let i = 0; i < images.length; i++) {
        console.log("Image: ", images[i]);
        const old_src = images[i].src;
        images[i].src =
          `${backendUrl}/${old_src.replace(frontendUrl + "/", "").replace("file://", "")}`;
      }
      item.text = doc.documentElement.innerHTML;
    });
    return data;
  }

  async getByYear(year: number|string): Promise<NewsItem[]> {
    const response = await $unAuthApi(`/news/year/${year}`);
    this.LogResponse("getNewsByYear", response);
    return response.data
  }
}

export default new NewsApi();
