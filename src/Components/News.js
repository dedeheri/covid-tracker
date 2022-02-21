import moment from "moment";
import React, { useEffect, useState } from "react";
import ThreeDots from "react-loading-icons/dist/components/three-dots";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_NEWS } from "../redux/action-type";
import { getNews } from "../redux/action/getNews";

const News = () => {
  const [pageSizePlus, setPageSizePlus] = useState(10);

  const dispatch = useDispatch();
  const { news, loading, loadingPerSize } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews(pageSizePlus));

    return () => dispatch({ type: REMOVE_NEWS });
  }, [pageSizePlus]);

  function transcut(text) {
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <ThreeDots fill="#606060" />
      </div>
    );
  }

  // console.log(news);

  return (
    <div className="border mt-6 border-[#404040] px-3 py-2 md:px-10 md:py-5 rounded-xl space-y-3">
      <h1 className="text-2xl">Berita Seputar COVID-19</h1>
      {Object.values(news).map((news, i) => (
        <a
          href={news.url}
          target="_blank"
          key={i}
          className="grid grid-cols-1 md:grid-cols-3 hover:bg-[#2F3033] transition duration-200 rounded-lg cursor-pointer p-1"
        >
          <img
            className="md:w-60 h-44 w-full rounded-lg"
            alt={news.description}
            src={
              news?.image?.thumbnail?.contentUrl ||
              "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
            }
          />

          <div className="flex flex-col col-span-2 space-y-3">
            <h1 className="font-semibold text-lg leading-6">{news.name}</h1>
            <p className="text-md leading-5">{transcut(news.description)}</p>
            <div className="flex justify-between items-center opacity-60">
              <p className="text-md leading-5">
                {moment(news.datePublished).fromNow()}
              </p>

              <p className="text-md leading-5">
                Sumber : {news.provider[0].name}
              </p>
            </div>
          </div>
        </a>
      ))}

      {loadingPerSize && (
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg animate-pulse p-1">
          <div className="bg-[#2F3033] md:w-60 w-full h-36 rounded-lg" />
          <div className="flex flex-col col-span-2 space-y-3">
            <h1 className="font-semibold bg-[#2F3033] rounded-lg text-lg h-8 " />
            <p className="text-md h-6 bg-[#2F3033] rounded-lg" />
            <p className="text-md h-6 bg-[#2F3033] rounded-lg" />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {news.length + 1 > 10 ? (
          <button
            onClick={() => setPageSizePlus(pageSizePlus - 5)}
            className="transition duration-200 hover:bg-[#2F3033] rounded-lg p-2 text-md cursor-pointer font-semibold"
          >
            Tampilkan Sedikit
          </button>
        ) : null}

        {news.length + 1 < 100 ? (
          <button
            onClick={() => setPageSizePlus(pageSizePlus + 5)}
            className="transition duration-200 hover:bg-[#2F3033] rounded-lg p-2 text-md cursor-pointer font-semibold"
          >
            Tampilkan lainya
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default News;
