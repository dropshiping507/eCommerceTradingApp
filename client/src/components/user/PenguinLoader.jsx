import { motion } from "framer-motion";
export default function PenguinLoader() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Penguin */}
      <div className="relative w-40 h-40 ">
        {/* Body */}
        <motion.div
          className="w-24 h-28 bg-black rounded-full absolute left-1/2 -translate-x-1/2 bottom-0"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Belly */}
        <div className="w-16 h-18 bg-white rounded-full absolute left-1/2 -translate-x-1/2 bottom-2" />

        {/* Head */}
        <motion.div
          className="w-20 h-20 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Eye blink */}
        <motion.div
          className="w-2 h-2 bg-white rounded-full absolute top-8 left-16"
          animate={{ scaleY: [1, 0.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Wing (WAVING) */}
        <motion.div
          className="w-10 h-6 bg-black rounded-full absolute left-0 top-14 origin-top-right"
          animate={{ rotate: [-20, 40, -20] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Beak */}
        <div className="w-3 h-3 bg-yellow-400 rotate-45 absolute left-1/2 -translate-x-1/2 top-10" />
      </div>

      {/* Text */}
      <motion.p
        className="mt-6 text-lg tracking-widest"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading your penguin...
      </motion.p>
    </div>
  );
}
