import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import candidateImg from "@/assets/candidate-jheremy.jpg";

const achievements = [
  {
    icon: Briefcase,
    title: "Experiencia en Gobierno",
    description: "Más de 10 años de experiencia en gestión pública y desarrollo de políticas.",
  },
  {
    icon: GraduationCap,
    title: "Formación Académica",
    description: "Maestría en Políticas Públicas y especialización en Desarrollo Social.",
  },
  {
    icon: Heart,
    title: "Compromiso Social",
    description: "Fundador de programas de apoyo juvenil y emprendimiento comunitario.",
  },
  {
    icon: MapPin,
    title: "Cercanía con el Pueblo",
    description: "Ha visitado las 24 regiones del Perú escuchando las necesidades ciudadanas.",
  },
];

const Candidato = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                CANDIDATO APRA 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                Jheremy
              </h1>
              <p className="text-2xl text-primary font-bold mb-6">
                El líder que el Perú necesita
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Con visión de futuro y compromiso inquebrantable con el pueblo peruano, 
                Jheremy representa una nueva generación de liderazgo político basado en 
                la transparencia, la innovación y la justicia social.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/propuestas">
                    Ver Propuestas
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contacto">Contáctame</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={candidateImg}
                  alt="Jheremy - Candidato APRA"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <Quote className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-lg font-bold italic">
                  "Juntos construiremos el Perú que todos merecemos"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Mi <span className="text-primary">Historia</span>
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Nacido en Lima, en el corazón de un barrio trabajador, Jheremy creció 
                entendiendo desde temprana edad los desafíos que enfrentan las familias 
                peruanas. Esta experiencia moldeó su vocación de servicio y su 
                compromiso inquebrantable con la justicia social.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Desde joven, se involucró en el activismo estudiantil y comunitario, 
                liderando iniciativas para mejorar la educación pública y crear 
                oportunidades para los jóvenes de su comunidad. Su trabajo incansable 
                lo llevó a ser reconocido como líder juvenil a nivel nacional.
              </p>
              <p className="text-lg text-muted-foreground">
                Con formación en políticas públicas y una década de experiencia en 
                gestión gubernamental, Jheremy ha demostrado que es posible gobernar 
                con transparencia, eficiencia y cercanía al pueblo. Ahora, busca 
                llevar esta visión a todo el Perú.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Trayectoria y <span className="text-primary">Logros</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {achievements.map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-card rounded-xl border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
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
            ¿Listo para el Cambio?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Únete a nuestra campaña y sé parte de la transformación que el Perú necesita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/contacto">
                Únete a la Campaña
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Candidato;
