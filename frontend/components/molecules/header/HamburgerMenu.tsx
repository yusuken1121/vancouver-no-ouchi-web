"use client";
import {
  EnvelopeClosedIcon,
  GearIcon,
  HamburgerMenuIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { HouseIcon } from "lucide-react";
import Link from "next/link";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex items-center justify-center">
      <button className="" onClick={toggleMenu}>
        <HamburgerMenuIcon className="mr-2 h-4 w-4" />
      </button>

      {isOpen && (
        <Command className="fixed z-50 top-16 right-0 md:right-2 rounded-lg border shadow-md md:max-w-[300px] max-h-[300px]">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="サービス案内">
              <CommandItem className="cursor-pointer">
                <Link href="/properties" className="flex items-center w-full">
                  <HouseIcon className="mr-2 h-4 w-4" />
                  <span>部屋探し</span>
                </Link>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <Link href="/blogs" className="flex items-center w-full">
                  <Pencil1Icon className="mr-2 h-4 w-4" />
                  <span>ブログ</span>
                </Link>
              </CommandItem>
              {/* <CommandItem>
                <FaceIcon className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem> */}
              {/* <CommandItem disabled>
                <RocketIcon className="mr-2 h-4 w-4" />
                <span>Launch</span>
              </CommandItem> */}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="お問い合わせ">
              <CommandItem>
                <PersonIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                <span>Mail</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <GearIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
