import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <Star className="h-24 w-24 text-primary-foreground fill-primary-foreground" />
        </div>
        <div className="absolute top-1/2 right-20">
          <Star className="h-16 w-16 text-primary-foreground fill-primary-foreground" />
        </div>
        <div className="absolute bottom-20 left-1/3">
          <Star className="h-20 w-20 text-primary-foreground fill-primary-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6">
            El Cambio Comienza <span className="block">Contigo</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Únete al movimiento que está transformando el Perú.
            Tu voz, tu voto, tu futuro. Juntos somos más fuertes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shadow-xl"
              asChild
            >
              <Link to="/contacto" className="gap-3">
                Contáctanos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">100% Transparente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
