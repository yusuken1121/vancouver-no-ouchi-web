import { HamburgerMenu } from "../molecules/header/HamburgerMenu";

const Header = () => {
  return (
    <header className="flex h-14 justify-center shadow-md">
      <div className="relative z-50 w-screen px-2 flex items-center justify-between">
        <div>Logo</div>
        <div>middle content</div>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
