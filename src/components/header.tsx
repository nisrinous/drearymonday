import Logo from "./logo";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
