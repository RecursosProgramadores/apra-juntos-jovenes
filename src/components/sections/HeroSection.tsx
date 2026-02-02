import { Link } from "react-router-dom";
import { Star, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroRally from "@/assets/hero-rally.png";
import portadaJorge from "@/assets/portadajorge.jpg";
import education from "@/assets/education.jpg";
import healthcare from "@/assets/healthcare.jpg";
import economy from "@/assets/economy.jpg";
import turismoImg from "@/assets/turismo.jpg";
import pymesImg from "@/assets/pymes.jpg";
import seguridadImg from "@/assets/seguridad.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with darker overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroRally})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 text-left">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 hero-text-shadow animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Por un Perú{" "}
              <span className="text-primary">Justo</span>,{" "}
              <span className="block mt-2">Moderno e Inclusivo</span>
            </h1>

            <div
              className="relative pl-6 border-l-4 border-primary animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed font-bold max-w-2xl">
                <span className="text-primary font-black">Jorge Alvarado Lino</span>,
                candidato del <span className="text-primary font-black">APRA</span>,
                lidera el cambio que nuestra juventud merece.
                <span className="block mt-2 text-primary-foreground/80 italic text-lg md:text-xl">
                  Juntos construimos el futuro.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contacto" className="gap-3">
                  Únete a la Campaña
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/propuestas">
                  Lee mis Propuestas
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-8 max-w-lg animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-left">
                <span className="block text-3xl md:text-4xl font-black text-white">100+</span>
                <span className="text-sm text-primary-foreground/70 font-medium whitespace-nowrap">Años de Historia</span>
              </div>
              <div className="text-left">
                <span className="block text-3xl md:text-4xl font-black text-white">24</span>
                <span className="text-sm text-primary-foreground/70 font-medium">Regiones</span>
              </div>
              <div className="text-left">
                <span className="block text-3xl md:text-4xl font-black text-white">1M+</span>
                <span className="text-sm text-primary-foreground/70 font-medium">Militantes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Image Mosaic */}
          <div className="lg:col-span-6 animate-fade-in-right" style={{ animationDelay: "0.5s" }}>
            <div className="grid grid-cols-4 gap-4 h-[540px]">
              {/* Main Image (Candidate) */}
              <div className="col-span-3 row-span-3 relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                {/* Voting Number Badge */}
                <div className="absolute top-6 right-6 z-30 animate-bounce">
                  <div className="bg-primary text-white w-20 h-20 rounded-xl border-4 border-white flex flex-col items-center justify-center shadow-2xl">
                    <span className="text-[10px] font-black leading-none uppercase">Marca el</span>
                    <span className="text-4xl font-black leading-none mt-1">3</span>
                  </div>
                </div>

                <img
                  src={portadaJorge}
                  alt="Jorge Alvarado Lino"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-3xl font-bold text-white mb-0 hero-text-shadow">Jorge Alvarado</h3>
                  <span className="text-primary font-black text-sm uppercase tracking-widest">Candidato Diputado</span>
                </div>
              </div>

              {/* Vertical Side Images */}
              <div className="col-span-1 row-span-1 relative group rounded-xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src={turismoImg}
                  alt="Turismo"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="col-span-1 row-span-1 relative group rounded-xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src={pymesImg}
                  alt="PYMES"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="col-span-1 row-span-1 relative group rounded-xl overflow-hidden shadow-lg border border-white/10">
                <img
                  src={seguridadImg}
                  alt="Seguridad"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Special block for Voting number call to action */}
              <div className="col-span-4 h-24 bg-gradient-to-r from-primary to-orange-600 rounded-2xl border border-white/20 flex items-center justify-between px-8 shadow-xl">
                <div className="flex flex-col">
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Este 2026</span>
                  <span className="text-white text-xl font-black italic">"Vota por la Renovación"</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-bold uppercase">Marca el</span>
                  <div className="bg-white text-primary w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-black">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
