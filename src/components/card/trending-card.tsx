import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { PiSparkleLight } from "react-icons/pi";
import useSWR from "swr";
import axios from "axios";
import { NewsData } from "@/types";

const TrendingCard = (news: NewsData) => {
  const { data } = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  return (
    <Card className="flex-1 rounded-sm flex flex-col justify-center w-[300px]">
      <CardContent>
        {news.isPremium ? (
          <Badge
            className={`pointer-events-none rounded-sm px-3 font-semibold mb-2 ${
              news.isPremium
                ? "border-none bg-amber-100 text-orange-500"
                : "border-none bg-white "
            }`}
          >
            Premium <PiSparkleLight />
          </Badge>
        ) : null}
        <CardTitle>
          <a href={`/news/${news.id}`} className="hover:cursor-pointer">
            {news.title}
          </a>
        </CardTitle>
        <CardDescription>
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
      </CardContent>
    </Card>
  );
};

export default TrendingCard;
