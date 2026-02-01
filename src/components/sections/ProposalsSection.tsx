import { Link } from "react-router-dom";
import {
  GraduationCap,
  Heart,
  TrendingUp,
  Leaf,
  Users,
  Shield,
  ArrowRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import educationImg from "@/assets/education.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import economyImg from "@/assets/economy.jpg";
import environmentImg from "@/assets/environment.jpg";
import turismoImg from "@/assets/turismo.jpg";
import pymesImg from "@/assets/pymes.jpg";
import seguridadImg from "@/assets/seguridad.jpg";

const proposals = [
  {
    id: "salud-infra",
    title: "Salud e Infraestructura",
    subtitle: "Hospitales para Huánuco",
    description: "Prioridad en la construcción de infraestructura médica de alta complejidad para la región y autonomía de EsSalud.",
    icon: Heart,
    image: healthcareImg,
    points: [
      "Hospital IV EsSalud Huánuco y Hospital II Tingo María",
      "Autonomía Administrativa, Política y Económica de EsSalud",
      "Seguro para transportistas, artistas y periodistas",
    ],
  },
  {
    id: "desarrollo-vial",
    title: "Vial y Conectividad",
    subtitle: "Corredores Estratégicos",
    description: "Impulso a grandes proyectos viales para conectar Huánuco con el desarrollo nacional e internacional.",
    icon: TrendingUp,
    image: economyImg,
    points: [
      "Autopista Pasco a Tingo María",
      "Corredor Puerto Chancay a Brasil",
      "Corredor Central por Huánuco",
    ],
  },
  {
    id: "agro-turismo",
    title: "Agro y Turismo",
    subtitle: "Potencia Exportadora",
    description: "Leyes especiales para potenciar el campo huanuqueño y facilitar la exportación de nuestros productos.",
    icon: Leaf,
    image: turismoImg,
    points: [
      "Ley Especial de Turismo en la Región de Huánuco",
      "Ley Especial para el Agro y Agroindustrial de exportación",
      "Créditos agrarios regionales",
    ],
  },
  {
    id: "creditos-pymes",
    title: "PYMES y Créditos",
    subtitle: "Apoyo al Emprendedor",
    description: "Facilidades financieras y leyes regionales que protejan y fomenten el crecimiento de la pequeña empresa.",
    icon: Users,
    image: pymesImg,
    points: [
      "Ley para Micro, Pequeña, Mediana y Gran Empresa",
      "Acceso a créditos regionales focalizados",
      "Código Laboral para todos los trabajadores del Perú",
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad Ciudadana",
    subtitle: "Paz y Tranquilidad",
    description: "Tecnología y patrullaje integrado para garantizar la seguridad de todas las familias huanuqueñas.",
    icon: Shield,
    image: seguridadImg,
    points: [
      "Patrullaje con drones",
      "Centros de monitoreo inteligentes",
      "Leyes contra la delincuencia",
    ],
  },
];

export const ProposalsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            PLAN REGIONAL HUÁNUCO
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            PROPUESTAS REGIONALES DEL CANDIDATO A DIPUTADO <span className="text-primary">JORGE ALVARADO LINO</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un compromiso real por el desarrollo integral de Huánuco y el bienestar de cada ciudadano.
          </p>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposals.map((proposal, index) => (
            <div
              key={proposal.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md card-hover proposal-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proposal.image}
                  alt={proposal.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                      <proposal.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-foreground">
                        {proposal.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/70">
                        {proposal.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {proposal.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {proposal.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full group/btn" asChild>
                  <Link to={`/propuestas#${proposal.id}`}>
                    Conoce más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/propuestas">
              Ver Todas las Propuestas
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProposalsSection;
