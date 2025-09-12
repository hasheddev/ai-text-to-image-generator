"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { assets } from "@/lib/assets";
import { useAppContext } from "@/context/app-context";

const Header = () => {
  const { user, setShowLogin } = useAppContext();
  const router = useRouter();

  const onClick = () => {
    if (user === null) {
      setShowLogin(true);
    } else {
      router.push("/result");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 text-center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full text-stone-500 border border-neutral-500 mb-12"
      >
        <p>Best text to image generator</p>
        <Image src={assets.star_icon} alt="star icon" width={13} height={13} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] text-center mx-auto"
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center max-w-xl mx-auto mt-5"
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ default: { duration: 2 }, opacity: { delay: 0.4 } }}
        onClick={onClick}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer"
      >
        Generate Images
        <Image src={assets.star_icon} alt="star icon" width={13} height={13} />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex flex-wrap justify-center mt-16 gap-3"
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <motion.div
            key={num}
            whileHover={{ scale: 1.05, animationDuration: 0.1 }}
          >
            <Image
              src={num % 2 ? assets.sample_img_1 : assets.sample_img_2}
              alt="star icon"
              width={590}
              height={590}
              className="w-[70px] h-auto rounded hover:scale-105 cursor-pointer trasition-all duration-300 max-sm:w-[20px]"
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-2 text-neutral-600"
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
