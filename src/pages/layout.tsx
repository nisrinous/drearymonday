import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/aside";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");
  const isUserPage = router.pathname.startsWith("/user");

  if (router.pathname.includes("/auth/signin")) return children;
  if (router.pathname.includes("/auth/signup")) return children;
  if (router.pathname.includes("/payment")) return children;

  return (
    <>
      <Header />
      {(isAdminPage || isUserPage) && (
        <div className="bg-white bg-opacity-70">
          <div className="container flex flex-row">
            <Aside />
            {children}
          </div>
        </div>
      )}
      {!isAdminPage && !isUserPage && <div>{children}</div>}
      <Footer />
    </>
  );
}
