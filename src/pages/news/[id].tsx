import { Button } from "@/components/ui/button";
import { NewsData, UserData } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { PiHeart } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { PiSparkleLight, PiShareFatLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import NewsCard from "@/components/card/news-card";

export default function Details() {
  const router = useRouter();
  const { id: newsId } = router.query;
  const { membership, id } = useSelector((state: RootState) => state.user);
  const [hearted, setHearted] = useState<boolean>();
  const [newsData, setNewsdata] = useState<NewsData[]>([]);

  let filteredliked: number[] = [];
  let filteredlikers: number[] = [];
  let history: number[] = [];

  const [news, setNews] = useState<NewsData>({
    id: "",
    isPremium: false,
    title: "",
    desc: "",
    image: "",
    created_at: "",
    updated_at: "",
    category: "",
    like: 0,
    share: 0,
    likers: [],
  });
  const [userData, setUserData] = useState<UserData>({
    id: "",
    role: "user",
    membership: "basic",
    name: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phonenumber: "",
    referral: "",
    liked: [],
    expired_subs: "",
    history: [],
  });

  const { data: dataNews, mutate: mutateNews } = useSWR(
    `http://localhost:9000/news/${newsId}`,
    async (url) => {
      const response = await axios.get(url);
      setNews(response.data);
    }
  );
  const { data: dataUSer, mutate: mutateUser } = useSWR(
    `http://localhost:9000/users/${id}`,
    async (url) => {
      const response = await axios.get(url);
      setUserData(response.data);
      mutateUser();
      setHearted(userData.liked.some((item) => item === Number(newsId)));
    }
  );

  const fetcher = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    setNewsdata(response.data);
  });

  fetcher;

  const handleLike = async () => {
    try {
      if (hearted && news.like > 0) {
        filteredliked = userData.liked.filter((item) => {
          return item !== Number(newsId);
        });
        filteredlikers = news.likers.filter((item) => {
          return item !== Number(id);
        });
        history = userData.history;
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: news.like - 1,
          likers: filteredlikers,
        });
        await axios.patch(`http://localhost:9000/users/${id}`, {
          liked: filteredliked,
          history: history,
        });
      }
      if (!hearted) {
        userData.liked.push(Number(newsId));
        news.likers.push(Number(id));
        userData.history.push(Number(newsId));
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: news.like + 1,
          likers: news.likers,
        });
        await axios.patch(`http://localhost:9000/users/${id}`, {
          liked: userData.liked,
          history: userData.history,
        });
      }
      setHearted((prev) => !prev);

      mutateNews();
      mutateUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      console.log(news.share);
      await axios.patch(`http://localhost:9000/news/${newsId}`, {
        share: news.share + 1,
      });
      mutateNews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {membership === "basic" && news.isPremium ? (
        <div className="absolute protected-news h-1/2 w-full bottom-0">
          <div className="absolute bottom-40 right-0 left-0">
            <h1 className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl text-center flex flex-row justify-center">
              <Link href="/user/subscription">
                <Button
                  variant="link"
                  className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl text-center"
                >
                  Subscribe premium for more
                </Button>
              </Link>
              <IconContext.Provider value={{ color: "yellow" }}>
                <PiSparkleLight />
              </IconContext.Provider>
            </h1>
          </div>
        </div>
      ) : null}
      <div className="container flex flex-col justify-start lg:px-80 lg:py-20">
        <img src={news.image} className="mb-10" alt=""></img>

        <div className="my-10">
          {news.isPremium ? (
            <div className="flex flex-row">
              <IconContext.Provider value={{ color: "orange" }}>
                <PiSparkleLight size={20} />
              </IconContext.Provider>
              <h3 className="mb-3 text-lg"> Member Only</h3>
            </div>
          ) : null}

          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            {news.title}
          </h1>
          <div className="text-muted-foreground">
            {news.updated_at === ""
              ? "Created at: " +
                new Date(news.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Last updated: " +
                new Date(news.updated_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </div>
          <div className="flex flex-row items-center justify-start gap-3">
            <div className="gap-1 flex flex-row justify-center items-center">
              <Button
                variant="ghost"
                className="hover:bg-transparent p-0"
                onClick={() => handleLike()}
              >
                {hearted ? <FcLike size={30} /> : <PiHeart size={27} />}
              </Button>
              <p>{news.like <= 0 ? null : news.like}</p>
            </div>
            <div className="gap-1 flex flex-row justify-center items-center ml-1">
              <Dialog>
                <DialogTrigger asChild className="hover:cursor-pointer">
                  <PiShareFatLight size={29} />
                </DialogTrigger>
                <p>{news.share === 0 ? null : news.share}</p>{" "}
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl">Send a link</DialogTitle>
                    <DialogDescription className="text-base">
                      Link to share
                    </DialogDescription>
                    <DialogDescription className="text-base border-b-2 py-1 border-purple-200">
                      {router.pathname}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="button" onClick={() => handleShare()}>
                        Copy link
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <h3 className="leading-normal sm:text-xl sm:leading-8">{news.desc}</h3>
      </div>
      <div className="container my-40 justify-center items-center">
        <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl mt-10 mb-5 border-b-[1px] border-white">
          Recommendations
        </h3>
        <div className="flex flex-row gap-7">
          {newsData
            .filter((item) => item.category.toLowerCase() === news.category)
            .map((item, i) => (
              <NewsCard
                key={i}
                title={item.title}
                desc={item.desc}
                image={item.image}
                isPremium={item.isPremium}
                id={item.id}
                like={item.like}
                created_at={item.created_at}
                updated_at={item.updated_at}
                category={item.category}
                share={item.share}
                likers={item.likers}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
