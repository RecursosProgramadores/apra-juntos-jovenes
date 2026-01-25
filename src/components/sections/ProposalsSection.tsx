import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Heart, 
  TrendingUp, 
  Leaf, 
  Users, 
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import educationImg from "@/assets/education.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import economyImg from "@/assets/economy.jpg";
import environmentImg from "@/assets/environment.jpg";

const proposals = [
  {
    id: "educacion",
    title: "Educación",
    subtitle: "Futuro para todos",
    description: "Acceso universal a educación de calidad, tecnología en cada aula y becas para jóvenes talentosos.",
    icon: GraduationCap,
    image: educationImg,
    points: [
      "Laptops para cada estudiante",
      "Becas integrales",
      "Reforma curricular moderna",
    ],
  },
  {
    id: "salud",
    title: "Salud",
    subtitle: "Bienestar garantizado",
    description: "Sistema de salud público fortalecido con acceso para todos los peruanos sin excepción.",
    icon: Heart,
    image: healthcareImg,
    points: [
      "Hospitales modernos",
      "Medicinas accesibles",
      "Prevención de enfermedades",
    ],
  },
  {
    id: "economia",
    title: "Economía",
    subtitle: "Oportunidades reales",
    description: "Empleo juvenil, apoyo a emprendedores y una economía que funcione para todos.",
    icon: TrendingUp,
    image: economyImg,
    points: [
      "Empleo digno para jóvenes",
      "Créditos para MYPES",
      "Reforma tributaria justa",
    ],
  },
  {
    id: "ambiente",
    title: "Medio Ambiente",
    subtitle: "Perú sostenible",
    description: "Protección de la Amazonía, energías renovables y desarrollo sostenible.",
    icon: Leaf,
    image: environmentImg,
    points: [
      "Protección de bosques",
      "Energía limpia",
      "Ciudades verdes",
    ],
  },
  {
    id: "juventud",
    title: "Juventud",
    subtitle: "El poder del cambio",
    description: "Programas de empoderamiento, innovación tecnológica y lucha contra la desigualdad.",
    icon: Users,
    image: educationImg,
    points: [
      "Centros de innovación",
      "Programas de emprendimiento",
      "Participación política",
    ],
  },
  {
    id: "anticorrupcion",
    title: "Anti-corrupción",
    subtitle: "Transparencia total",
    description: "Reformas institucionales, gobierno abierto y tolerancia cero a la corrupción.",
    icon: Shield,
    image: economyImg,
    points: [
      "Fiscalización ciudadana",
      "Gobierno digital",
      "Justicia independiente",
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
            NUESTRAS PROPUESTAS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Un Plan para el <span className="text-primary">Perú</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Propuestas concretas y realizables para transformar nuestro país. 
            Cada área con acciones claras y medibles.
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
