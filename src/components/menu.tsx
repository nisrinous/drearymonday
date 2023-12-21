import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { PiSparkleLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import Cookies from "js-cookie";

import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const Menu = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const { role } = useSelector((state: RootState) => state.user);

  const logout = () => {
    Cookies.remove("user-role", { path: "/" });
    Cookies.remove("user-id", { path: "/" });
    Cookies.remove("user-membership", { path: "/" });
    Cookies.remove("authToken", { path: "/" });
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (token) {
      dispatch(
        setAttribute({
          token: token,
          id: Cookies.get("user-id"),
          role: Cookies.get("user-role"),
          membership: Cookies.get("user-membership"),
        })
      );
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="border-none">
          <CiUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-center">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-right">
          <DropdownMenuItem>
            <Link href={`${role === "admin" ? "/admin" : "/user"}`}>
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={`${role === "admin" ? "hidden" : null}`}>
            <Link href="/user/subscription" className="flex flex-row">
              <span>Premium</span>
              <IconContext.Provider value={{ color: "orange" }}>
                <PiSparkleLight />
              </IconContext.Provider>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={`${role !== "admin" ? "hidden" : null}`}>
            <Link href="/admin/news">
              <span>News Store</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span onClick={() => logout()}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
