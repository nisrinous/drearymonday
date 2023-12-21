import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Details() {
  const [hideButton, setHideButton] = useState<boolean>(false);
  const displaySuccess = () => {
    toast.success("Payment successful");
    setHideButton(true);
  };
  return (
    <>
      <div className="container flex flex-col justify-center items-center my-40">
        <Logo />

        {!hideButton ? (
          <>
            <p className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl my-5 text-muted-foreground">
              Press this button to continue..
            </p>
            <Button type="button" onClick={() => displaySuccess()}>
              Place my order
            </Button>
          </>
        ) : (
          <h2 className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl my-5 text-muted-foreground">
            Payment completed.
          </h2>
        )}
      </div>
    </>
  );
}
