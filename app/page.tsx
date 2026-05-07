import MatchaCanvas from "@/components/matcha-canvas";
import New from "@/components/new";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <MatchaCanvas />

      <div style={{ marginTop: "100px" }} className="space-y-10">
        {" "}
        <New />
        <New />
        <New />
        <New />
      </div>

      <footer className="bg-black border-t border-white/5 py-10 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm tracking-[0.3em] text-white/30">
          SŌL MATCHA
        </span>
        <span className="text-[10px] tracking-widest uppercase text-white/20">
          © {new Date().getFullYear()} · All rights reserved
        </span>
      </footer>
    </main>
  );
}
