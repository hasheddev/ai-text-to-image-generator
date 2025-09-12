"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { assets } from "@/lib/assets";
import { generateImage } from "@/lib/actions/image-action";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/app-context";

export default function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const router = useRouter();
  const { setUser } = useAppContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      try {
        const result = await generateImage(input);
        if (!result.success && result.error) {
          toast.error(result.error);
          if (result.credits === 0) {
            router.push("/buy-credit");
          }
        }
        if (result.success) {
          setUser({
            name: result?.name as string,
            credits: result?.credits as number,
          });
          if (result.generatedImage) {
            toast.success("image generated successfully");
            setImage(result.generatedImage);
            setIsImageLoaded(true);
          }
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onSubmit={onSubmit}
      className="flex flex-col min-h-[90dvh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <Image
            src={image}
            alt="generated image"
            width={590}
            height={590}
            className="max-w-sm rounded"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500  ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        <p className={loading ? "" : "hidden"}>Loading...</p>
      </div>
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl text-white bg-neutral-500 text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 placeholder-[#e0e0e0] placeholder:font-light bg-transparent outline-none ml-8 max-sm:w-20"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-zinc-900 px-10 cursor-pointer sm-px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            type="button"
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate another
          </button>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
}
