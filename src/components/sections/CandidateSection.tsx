import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import candidateImg from "@/assets/fotoportadaalvaro.png";

export const CandidateSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={candidateImg}
                  alt="Jorge Alvarado Lino - Candidato APRA"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />

              {/* Quote Card */}
              <div className="absolute -bottom-8 -right-4 md:right-8 bg-card rounded-2xl p-6 shadow-xl max-w-xs z-20 border">
                <Quote className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground italic">
                  "El Perú que soñamos se construye con la fuerza de nuestra juventud."
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-bold">
                  — Jorge Alvarado Lino
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              CONOCE AL CANDIDATO
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Jorge Alvarado Lino
              <span className="block text-2xl md:text-3xl font-bold text-primary mt-2">
                Candidato Principal del APRA
              </span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                Nacido en Lima, con una trayectoria dedicada al servicio público
                y la defensa de los derechos de los jóvenes peruanos.
              </p>
              <p>
                Desde muy joven, Jorge Alvarado Lino se involucró en el activismo social,
                liderando iniciativas para mejorar la educación y las oportunidades
                laborales en las comunidades más necesitadas.
              </p>
              <p>
                Con formación en política pública y experiencia en gobierno local,
                representa una nueva generación de líderes comprometidos con
                la transformación del Perú.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <span className="block text-2xl font-black text-primary">10+</span>
                <span className="text-xs text-muted-foreground font-medium">Años de servicio</span>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <span className="block text-2xl font-black text-primary">50+</span>
                <span className="text-xs text-muted-foreground font-medium">Proyectos</span>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <span className="block text-2xl font-black text-primary">100K+</span>
                <span className="text-xs text-muted-foreground font-medium">Vidas impactadas</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/candidato">
                  Conoce mi Historia
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contacto">
                  Contáctame
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
