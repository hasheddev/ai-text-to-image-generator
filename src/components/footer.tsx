"use client";

import Image from "next/image";

import { assets } from "@/lib/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <Image
        src={assets.logo}
        alt="site logo"
        width={144}
        height={38}
        className="w-[150px] h-auto"
      />
      <p className="flex-1 pl-4 border-l border-gray-500 text-sm text-gray-500 max-sm:hidden">
        Copyright @Hasheddev | All rights reserved.
      </p>
      <div className="flex gap-2.5">
        <Image
          src={assets.facebook_icon}
          alt="facebook icon"
          width={35}
          height={35}
        />
        <Image src={assets.twitter_icon} alt="icon" width={35} height={35} />
        <Image
          src={assets.instagram_icon}
          alt="instagram icon"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

export default Footer;
