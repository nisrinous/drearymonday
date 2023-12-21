import { RootState } from "@/store/store";
import { UserData } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Profile() {
  const { id } = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/users/${id}`);
        const fetchedData = response.data;
        setUserData(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <>
      <div className="w-screen p-10 bg-white">
        <div className="my-10 flex-col text-left">
          <h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
            Profile
          </h1>
          <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-5">
            Manage your profile
          </p>
        </div>
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-row justify-start items-center gap-5 my-3">
            <div>
              <CgProfile size={70} />
            </div>
            <div>
              <p className="leading-tight sm:text-lg sm:leading-8">Username:</p>
              <p className="text-lg text-muted-foreground">
                @{userData?.username}
              </p>
            </div>
          </div>

          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b">
              Account Name
            </p>
            <p className="text-muted-foreground">{userData?.name}</p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b">
              E-mail
            </p>
            <p className="text-muted-foreground">{userData?.email}</p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b">
              Membership
            </p>
            <p className="text-muted-foreground">
              Membeship: {userData?.membership}
            </p>
            <p className="text-muted-foreground">
              Expire Date: {userData?.expired_subs.slice(0, 10)}
            </p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b">
              Address
            </p>
            <p className="text-muted-foreground">{userData?.address}</p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b">
              Phone Number
            </p>
            <p className=" text-muted-foreground">{userData?.phonenumber}</p>
          </div>
        </div>
      </div>
    </>
  );
}
