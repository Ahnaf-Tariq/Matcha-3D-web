import BenefitsBento from "@/components/benefit-bento";
import ExperienceSection from "@/components/experience-section";
import MatchaCanvas from "@/components/hero/matcha-canvas";
import Navbar from "@/components/navbar/navbar";
import New from "@/components/new";
import ProcessSection from "@/components/process-section";
import ShopSection from "@/components/shop-section";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <MatchaCanvas />

      <div style={{ marginTop: "100px" }} className="space-y-10">
        <New />
        <BenefitsBento />
        <ExperienceSection />
        <ProcessSection />
        <ShopSection />
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
