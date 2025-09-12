"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/context/app-context";
import { assets } from "@/lib/assets";
import { logout } from "@/lib/actions/user-actions";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setShowLogin, setUser } = useAppContext();
  const router = useRouter();

  const signOut = async () => {
    const message = await logout();
    if (message.success) {
      setUser(null);
      toast.success(message.message);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">
        <Image
          src={assets.logo}
          alt="site logo"
          width={144}
          height={38}
          className="w-28 sm:w-32 lg:w-40 h-auto"
        />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => router.push("/buy-credit")}
              className="flex items-center cursor-pointer gap-2 bg-blue-100 px-4 sm:px-16 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <Image
                src={assets.credit_star}
                alt="start con"
                width={23}
                height={23}
                className="w-5 h-auto"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {`Credits left: ${user.credits}`}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <Image
                src={assets.profile_icon}
                alt="user profile icon"
                width={128}
                height={128}
                className="w-10 drop-shadow h-auto"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm flex items-center justify-center">
                  <button
                    onClick={signOut}
                    className="py-1 px-3 sm:px-5 cursor-pointer"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <Link href="/buy-credit" className="cursor-pointer">
              Pricing
            </Link>
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer text-white bg-zinc-800 px-7 sm:px-10 py-2 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
