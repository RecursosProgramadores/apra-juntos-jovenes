import { Link } from "react-router-dom";
import { Star, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroRally from "@/assets/hero-rally.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroRally})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* APRA Logo */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="relative inline-flex items-center justify-center">
              <Star className="h-24 w-24 md:h-32 md:w-32 text-primary fill-primary animate-pulse-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg md:text-xl font-black text-primary-foreground tracking-tight">
                  APRA
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 hero-text-shadow animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Por un Perú{" "}
            <span className="text-primary">Justo</span>,{" "}
            <span className="block mt-2">Moderno e Inclusivo</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto font-medium animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Jheremy, candidato del APRA, lidera el cambio que nuestra juventud merece. 
            Juntos construimos el futuro.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
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
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contacto">
                Dona Ahora
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-black text-primary">100+</span>
              <span className="text-sm text-primary-foreground/70 font-medium">Años de Historia</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-black text-primary">24</span>
              <span className="text-sm text-primary-foreground/70 font-medium">Regiones</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-black text-primary">1M+</span>
              <span className="text-sm text-primary-foreground/70 font-medium">Militantes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs font-medium uppercase tracking-widest">Descubre más</span>
          <ChevronDown className="h-6 w-6 scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
