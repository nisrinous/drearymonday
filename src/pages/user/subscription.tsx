import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import axios from "axios";
import router from "next/router";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

export default function Subscription() {
  const [onSubs, setOnSubs] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const { id } = useSelector((state: RootState) => state.user);

  const handleSubscription = (type: string) => {
    setOnSubs(true);
    setType(type);
  };

  const activateSubscription = async () => {
    let months = 0;
    if (type === "for a month") {
      months = 1;
    } else {
      months = 12;
    }
    console.log(months);
    try {
      await axios
        .get(`http://localhost:9000/users/${id}`)
        .then((response) => {
          const data = response.data;

          return axios.post("http://localhost:9000/transactions", {
            user: data.email,
            type: months,
            created_at: new Date(),
            updated_at: "",
            status: "processing",
            total_paid: months == 1 ? 9 : 99,
          });
        })
        .catch((error) => {
          console.error(error);
        });
      router.push("/user");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-screen p-10 h-full bg-white">
      <div className="my-10 flex-col text-left">
        <h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
          Subscriptions
        </h1>
        <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-5">
          Manage your subscription
        </p>
      </div>
      {!onSubs ? (
        <div className="w-full">
          <h1 className="text-xl font-semibold sm:text-2xl my-3">
            Subscribe Plans
          </h1>
          <div className="flex flex-col sm:flex-row items-end gap-10">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Monthly</CardTitle>
                <CardDescription>
                  Subscribe our premium news monthly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $9
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center p-6 w-full">
                <Button onClick={() => handleSubscription("for a month")}>
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Yearly</CardTitle>
                <CardDescription>
                  Subscribe our premium news for a year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $99
                  <span className="text-sm font-normal text-muted-foreground">
                    /year
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center p-6 w-full">
                <Button onClick={() => handleSubscription("for a year")}>
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-xl font-semibold sm:text-2xl mt-3">
            Subscribe {type}
          </h1>
          <p className="text-muted-foreground">
            Complete this payment to enjoy premium news
          </p>
          <div className="flex flex-col gap-3 my-20">
            <div className="text-6xl font-bold">
              ${type === "for a year" ? 99 : 9}
            </div>
            <ul>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <div className="pt-1">
                  <IconContext.Provider value={{ color: "orange" }}>
                    <FaCheck />
                  </IconContext.Provider>
                </div>
                Exclusive Content Access
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <div className="pt-1">
                  <IconContext.Provider value={{ color: "orange" }}>
                    <FaCheck />
                  </IconContext.Provider>
                </div>
                Ad-Free Experience
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <div className="pt-1">
                  <IconContext.Provider value={{ color: "orange" }}>
                    <FaCheck />
                  </IconContext.Provider>
                </div>
                Early Access or Sneak Peeks
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <div className="pt-1">
                  <IconContext.Provider value={{ color: "orange" }}>
                    <FaCheck />
                  </IconContext.Provider>
                </div>
                Community or Engagement Features
              </li>
            </ul>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Payment Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
              <DialogHeader>
                <DialogTitle className="text-3xl mb-5">Payment</DialogTitle>
                <DialogDescription className="text-base">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={`http://10.20.191.32:3000/payment`}
                    viewBox={`0 0 256 256`}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <div className="my-10">
                    <Button
                      type="button"
                      onClick={() => activateSubscription()}
                    >
                      I have completed the payment
                    </Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
