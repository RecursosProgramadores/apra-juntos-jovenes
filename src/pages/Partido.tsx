import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Calendar, Users, Flag, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  {
    year: "1924",
    title: "Fundación del APRA",
    description: "Víctor Raúl Haya de la Torre funda el APRA en México como movimiento antiimperialista y de integración latinoamericana.",
  },
  {
    year: "1930",
    title: "Primera Campaña Electoral",
    description: "El APRA participa por primera vez en elecciones presidenciales, sentando las bases del partido moderno.",
  },
  {
    year: "1985",
    title: "Primer Gobierno Aprista",
    description: "Alan García asume la presidencia, marcando la primera victoria electoral del partido a nivel nacional.",
  },
  {
    year: "2006",
    title: "Segundo Gobierno",
    description: "El APRA retorna al poder con un enfoque en estabilidad económica y programas sociales.",
  },
  {
    year: "2024",
    title: "Renovación Generacional",
    description: "Nueva generación de líderes como Jorge Alvarado Lino impulsan la modernización del partido hacia el 2026.",
  },
];

const values = [
  {
    icon: Users,
    title: "Justicia Social",
    description: "Luchamos por una sociedad donde todos tengan las mismas oportunidades de desarrollo.",
  },
  {
    icon: Flag,
    title: "Unidad Latinoamericana",
    description: "Promovemos la integración y cooperación entre los pueblos de América Latina.",
  },
  {
    icon: Award,
    title: "Democracia Participativa",
    description: "Defendemos el derecho de todos los ciudadanos a participar en las decisiones del país.",
  },
  {
    icon: Star,
    title: "Anti-corrupción",
    description: "Tolerancia cero a la corrupción, promovemos la transparencia en todos los niveles.",
  },
];

const Partido = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              NUESTRA HISTORIA
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              100 Años de <span className="text-primary">Lucha</span> por el Perú
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde 1924, el APRA ha sido protagonista de la historia política peruana,
              defendiendo los derechos del pueblo y la justicia social.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Nuestros <span className="text-primary">Valores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border hover:border-primary transition-colors card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            Nuestra <span className="text-primary">Trayectoria</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                {/* Line */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute left-[11px] top-8 w-0.5 h-full bg-primary/20" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-primary-foreground" />
                </div>
                <div className="bg-card rounded-xl p-6 ml-4 border hover:border-primary transition-colors">
                  <span className="text-primary font-black text-lg">{event.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-6">
            Sé Parte de la Historia
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Únete al partido que ha transformado el Perú y sigue luchando por un futuro mejor.
          </p>
          <Button
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/contacto">
              Únete al APRA
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Partido;
