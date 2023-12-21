import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { PiSparkleLight } from "react-icons/pi";

import { useState } from "react";
import useSWR from "swr";
import { NewsData } from "@/types";
import axios from "axios";

const NewsCard = (news: NewsData) => {
  const { data, mutate } = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });
  const handleLike = async () => {
    try {
      if (liked && news.like > 0) {
        await axios.patch(`http://localhost:9000/news/${news.id}`, {
          like: news.like - 1,
        });
      }
      if (!liked) {
        await axios.patch(`http://localhost:9000/news/${news.id}`, {
          like: news.like + 1,
        });
      }
      mutate();
      setLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const [liked, setLiked] = useState<boolean>();

  return (
    <Card className="w-full flex-1 rounded-sm flex flex-col md:flex-row items-center">
      <div className="my-3">
        <CardContent className="pb-5 w-11/12">
          {news.isPremium ? (
            <Badge
              className={`w-24 mb-3 mx-auto pointer-events-none rounded-sm px-3 pl-4 font-semibold ${
                news.isPremium ? "border-none bg-amber-100 text-orange-500" : ""
              }`}
            >
              Premium <PiSparkleLight />
            </Badge>
          ) : null}
          <CardTitle>
            <a
              href={`/news/${news.id}`}
              className="hover:cursor-pointer hover:border-b-2 py-0 border-black"
            >
              {news.title}
            </a>
          </CardTitle>
          <CardDescription className="mb-5">
            {news.updated_at === ""
              ? new Date(news.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : new Date(news.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
            {news.like !== 0 ? "· " + news.like + " likes" : null}
          </CardDescription>
          <CardDescription className="w-5/6">
            {news.desc.substring(0, 200)}...
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default NewsCard;
