import Logo from "./logo";
import { FaTwitter, FaGithub, FaGitlab } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" my-10">
      <div className="container flex flex-row justify-between ">
        <div>
          <Logo />
          <h3 className="text-muted-foreground p-3">A project by Betty</h3>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 p-3">
          <FaTwitter size={25} />
          <FaGithub size={25} />
          <FaGitlab size={25} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
