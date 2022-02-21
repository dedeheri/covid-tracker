import axios from "axios";
import { GET_NEWS } from "../action-type";

export const getNews = (pageSize) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://bing-news-search1.p.rapidapi.com/news/search`,
        {
          params: {
            q: "corona",
            count: pageSize,
            setLang: "ID",
            freshness: "Day",
            textFormat: "Raw",
            safeSearch: "Off",
          },
          headers: {
            "x-bingapis-sdk": "true",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            "x-rapidapi-key":
              "d280df9834mshbccf37a598cb8a8p1952eejsn29939f952305",
          },
        }
      );

      dispatch({ type: GET_NEWS, payload: data.value });
    } catch (error) {
      console.error(error);
    }
  };
};
