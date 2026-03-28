"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Notification() {
  const { notification, hideNotification } = useCart();

  return (
    <AnimatePresence>
      {notification?.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-24 md:top-28 right-4 md:right-8 z-[100] flex items-center gap-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-sm p-4 w-[90%] md:w-auto max-w-sm mx-auto left-0 md:left-auto right-0"
        >
          <div className="bg-[#25D366]/20 p-2 rounded-full shrink-0">
            <CheckCircle2 size={24} className="text-[#25D366]" />
          </div>
          
          <p className="text-white font-black italic text-sm md:text-base flex-1 leading-tight tracking-wide">
            {notification.message}
          </p>

          <button 
            onClick={hideNotification}
            className="text-gray-400 hover:text-white transition-colors p-1 shrink-0"
            aria-label="Kapat"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
