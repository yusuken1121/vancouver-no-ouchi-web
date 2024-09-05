import Image from "next/image";
import HomeNav from "../atoms/header/HomeNav";
import { HamburgerMenu } from "../molecules/header/HamburgerMenu";
import NavMenu from "../molecules/header/NavMenu";

const Header = () => {
  return (
    <header className="flex h-14 justify-center shadow-md bg-richBlue text-white">
      <div className="base-px relative z-50 w-screen flex items-center justify-between">
        <Image
          src="https://i.imgur.com/XIU12AP.png"
          width={80}
          height={70}
          style={{ objectFit: "cover" }}
          alt="VancouverNoOuchi Image"
          unoptimized={true}
        />
        <div className="hidden md:block">
          <NavMenu />
        </div>
        <div className="block md:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
