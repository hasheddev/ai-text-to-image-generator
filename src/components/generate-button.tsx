"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { assets } from "@/lib/assets";
import { useAppContext } from "@/context/app-context";

const GenerateButton = () => {
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
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="md:text-3xl text-2xl lg:text-4xl font-semibold py-6 md:py-16 text-neutral-800 mb-2 mt-4">
        See the magic. Try now
      </h1>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 cursor-pointer transition-all duration-500"
      >
        Generate Images
        <Image
          src={assets.star_group}
          alt="magic star image"
          width={92}
          height={93}
          className="w-auto h-6"
        />
      </button>
    </motion.div>
  );
};

export default GenerateButton;
