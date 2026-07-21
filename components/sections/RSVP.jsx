"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, User, Users, MessageSquare, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import supabase client (sesuaikan path impor sesuai struktur project-mu)
import { supabase } from "@/lib/supabaseClient";

/**
 * Toggle `isDemo` ke false saat siap terhubung ke Supabase secara live.
 */
const isDemo = true;

export default function RSVP() {
  const [form, setForm] = useState({
    name: "",
    attendance: "",
    guestCount: "1",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.attendance) return;

    setStatus("loading");

    if (isDemo) {
      // 🎭 MODE DEMO: Simulasi request
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setForm({ name: "", attendance: "", guestCount: "1", message: "" });
      } catch (error) {
        setStatus("error");
      }
    } else {      
      try {
        const promises = [];

        // 1. Simpan Konfirmasi Kehadiran ke tabel `rsvps`
        promises.push(
          supabase.from("rsvps").insert([
            {
              name: form.name,
              attendance: form.attendance,
              guest_count: form.attendance === "Hadir" ? parseInt(form.guestCount) : 0,
            },
          ])
        );

        // 2. Jika user mengisi ucapan/doa, simpan ke tabel `greetings`
        if (form.message.trim() !== "") {
          promises.push(
            supabase.from("greetings").insert([
              {
                name: form.name,
                message: form.message,
              },
            ])
          );
        }

        const results = await Promise.all(promises);

        // Periksa jika ada error pada salah satu query
        const hasError = results.some((res) => res.error);
        if (hasError) {
          const firstErr = results.find((res) => res.error);
          throw firstErr.error;
        }

        setStatus("success");
        setForm({ name: "", attendance: "", guestCount: "1", message: "" });
      } catch (error) {
        console.error("Supabase insert error:", error);
        setStatus("error");
      }
    }
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-secondary/10">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            Reservation {isDemo && "(Demo Mode)"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Konfirmasi Kehadiran
          </h2>
          <div className="w-12 h-px bg-primary/30 mx-auto mb-8" />
          <p className="font-sans text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Merupakan suatu kehormatan bagi kami jika Bapak/Ibu/Saudara/i dapat hadir dan memberikan restu bagi kedua mempelai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-background luxury-border p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessState onReset={() => setStatus("idle")} />
            ) : (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-xs tracking-widest uppercase text-primary/70">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <Input
                      id="name"
                      placeholder="Masukkan nama Anda"
                      className="pl-10 h-12 bg-transparent border-primary/20 focus-visible:ring-primary/30"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs tracking-widest uppercase text-primary/70">
                    Konfirmasi Kehadiran
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Hadir", "Tidak Hadir"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setForm({ ...form, attendance: option })}
                        className={`py-3 px-6 text-xs uppercase tracking-widest border transition-all duration-300 ${
                          form.attendance === option
                            ? "bg-primary border-primary text-background"
                            : "border-primary/20 text-primary hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {form.attendance === "Hadir" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <Label htmlFor="guests" className="text-xs tracking-widest uppercase text-primary/70">
                      Jumlah Tamu
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <Select
                        value={form.guestCount}
                        onValueChange={(val) => setForm({ ...form, guestCount: val })}
                      >
                        <SelectTrigger className="pl-10 h-12 bg-transparent border-primary/20">
                          <SelectValue placeholder="Pilih jumlah tamu" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} Orang
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <Label htmlFor="message" className="text-xs tracking-widest uppercase text-primary/70">
                    Ucapan & Doa
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-primary/40" size={18} />
                    <Textarea
                      id="message"
                      placeholder="Tuliskan ucapan untuk mempelai"
                      className="pl-10 min-h-[120px] bg-transparent border-primary/20 focus-visible:ring-primary/30"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-14 bg-primary text-background hover:bg-primary/90 transition-all duration-300 text-xs tracking-[0.3em] uppercase group"
                >
                  <Send
                    className={`mr-2 transition-transform duration-300 ${
                      status === "loading"
                        ? "animate-pulse"
                        : "group-hover:translate-x-1 group-hover:-translate-y-1"
                    }`}
                    size={16}
                  />
                  {status === "loading" ? "Mengirim..." : "Kirim Konfirmasi"}
                </Button>

                {status === "error" && (
                  <p className="text-destructive text-xs text-center flex items-center justify-center gap-2">
                    <AlertCircle size={14} />
                    Gagal mengirim. Silakan coba lagi.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-8"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <CheckCircle2 className="text-primary" size={32} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-2xl mb-4 text-foreground font-light">
        Terima Kasih!
      </h3>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8 max-w-[280px]">
        Pesan Anda telah kami terima. Kami sangat menantikan kehadiran Bapak/Ibu/Saudara/i.
      </p>
      <Button
        variant="ghost"
        onClick={onReset}
        className="text-primary hover:bg-primary/10 text-xs tracking-widest uppercase font-sans"
      >
        Isi Kembali
      </Button>
    </motion.div>
  );
}