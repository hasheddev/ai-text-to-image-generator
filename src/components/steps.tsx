"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { stepsData } from "@/lib/assets";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center my-32"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform Words Into Stunning Images
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md  cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <Image
              src={step.icon}
              alt={step.alt}
              width={45}
              height={45}
              className="w-[40px] h-auto"
            />
            <div>
              <h2 className="text-xl font-medium">{step.title}</h2>
              <p className="text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
