"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift as GiftIcon, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { weddingData } from "@/lib/data";

/**
 * Gift Section
 * Provides bank account and physical address information for wedding gifts.
 */
export default function Gift() {
  const { accounts, address } = weddingData.gift;

  return (
    <section id="gift" className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Decorative radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            Love & Support
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Hadiah Pernikahan
          </h2>
          <div className="w-12 h-px bg-primary/30 mx-auto mb-8" />
          <p className="font-sans text-background/60 text-sm max-w-md mx-auto leading-relaxed italic">
            &ldquo;Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, Bapak/Ibu/Saudara/i dapat memberikan melalui:&rdquo;
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {accounts.map((account, index) => (
            <BankCard key={index} account={account} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="bg-background/5 border-primary/20 backdrop-blur-sm shadow-none group transition-all duration-500 hover:border-primary/40">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="text-primary/60" size={20} />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
                    Kirim Hadiah Fisik
                  </h4>
                  <p className="font-serif text-xl mb-2 text-primary/90">
                    {address.name}
                  </p>
                  <p className="font-sans text-sm text-background/60 leading-relaxed max-w-xs">
                    {address.street}, {address.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * BankCard Component
 * Individual bank account display with one-click copy functionality.
 */
function BankCard({ account, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card className="bg-background/5 border-primary/20 backdrop-blur-sm shadow-none h-full group transition-all duration-500 hover:border-primary/40 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500" />
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-2xl tracking-wider text-primary">
            {account.bank}
          </CardTitle>
          <CreditCard className="text-primary/20 group-hover:text-primary/40 transition-colors duration-500" size={24} />
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-1">
              Atas Nama
            </p>
            <p className="font-sans text-base text-background/80 font-light">
              {account.accountName}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-1">
              Nomor Rekening
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="font-sans text-xl tracking-wider text-primary font-light">
                {account.accountNumber}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="hover:bg-primary/10 text-primary/60 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Check size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
