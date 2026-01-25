import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  GraduationCap, Heart, TrendingUp, Leaf, Users, Shield, 
  ArrowRight, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import educationImg from "@/assets/education.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import economyImg from "@/assets/economy.jpg";
import environmentImg from "@/assets/environment.jpg";

const proposals = [
  {
    id: "educacion",
    title: "Educación de Calidad",
    subtitle: "Invertir en el futuro de nuestros jóvenes",
    icon: GraduationCap,
    image: educationImg,
    description: "Transformaremos el sistema educativo peruano para garantizar que cada niño y joven tenga acceso a una educación de primer nivel.",
    points: [
      "Laptops y tablets para todos los estudiantes de escuelas públicas",
      "Conectividad de internet en todas las instituciones educativas",
      "Programa de becas integrales para educación superior",
      "Reforma curricular enfocada en habilidades del siglo XXI",
      "Capacitación continua y mejores salarios para docentes",
      "Construcción y modernización de infraestructura escolar",
    ],
  },
  {
    id: "salud",
    title: "Salud para Todos",
    subtitle: "Un sistema de salud que proteja a cada peruano",
    icon: Heart,
    image: healthcareImg,
    description: "Fortaleceremos el sistema de salud pública para garantizar atención médica de calidad, accesible y oportuna para todos.",
    points: [
      "Hospitales modernos en todas las regiones del país",
      "Medicamentos esenciales gratuitos para poblaciones vulnerables",
      "Programa nacional de prevención de enfermedades crónicas",
      "Salud mental como prioridad nacional",
      "Telemedicina para zonas rurales y de difícil acceso",
      "Mejores condiciones laborales para profesionales de la salud",
    ],
  },
  {
    id: "economia",
    title: "Economía Inclusiva",
    subtitle: "Oportunidades económicas para todos",
    icon: TrendingUp,
    image: economyImg,
    description: "Crearemos una economía que funcione para todos, con énfasis en el empleo juvenil y el apoyo a emprendedores.",
    points: [
      "Programa de primer empleo con incentivos para empresas",
      "Créditos blandos y capacitación para emprendedores",
      "Formalización de la economía con beneficios reales",
      "Reforma tributaria progresiva y justa",
      "Desarrollo de industrias estratégicas y tecnología",
      "Protección y dignificación del trabajo informal",
    ],
  },
  {
    id: "ambiente",
    title: "Medio Ambiente",
    subtitle: "Perú sostenible para las futuras generaciones",
    icon: Leaf,
    image: environmentImg,
    description: "Protegeremos nuestros recursos naturales mientras impulsamos un desarrollo económico sostenible y responsable.",
    points: [
      "Protección efectiva de la Amazonía y áreas naturales",
      "Transición hacia energías renovables",
      "Programa de ciudades verdes y movilidad sostenible",
      "Gestión integral de residuos sólidos",
      "Lucha contra la minería ilegal y la deforestación",
      "Educación ambiental en todos los niveles",
    ],
  },
  {
    id: "juventud",
    title: "Juventud Empoderada",
    subtitle: "Los jóvenes como protagonistas del cambio",
    icon: Users,
    image: educationImg,
    description: "Los jóvenes son el presente y el futuro del Perú. Crearemos programas que les permitan desarrollar todo su potencial.",
    points: [
      "Centros de innovación y tecnología en cada región",
      "Programa de emprendimiento juvenil con financiamiento",
      "Espacios de participación política y ciudadana",
      "Programas deportivos y culturales gratuitos",
      "Lucha contra la violencia y el acoso juvenil",
      "Salud mental y bienestar para jóvenes",
    ],
  },
  {
    id: "anticorrupcion",
    title: "Cero Corrupción",
    subtitle: "Transparencia y rendición de cuentas",
    icon: Shield,
    image: economyImg,
    description: "Acabaremos con la corrupción que tanto daño ha hecho al país, con reformas estructurales y tolerancia cero.",
    points: [
      "Gobierno digital y datos abiertos para todos",
      "Fiscalización ciudadana de gastos públicos",
      "Reforma del sistema de justicia independiente",
      "Protección efectiva a denunciantes de corrupción",
      "Inhabilitación perpetua para funcionarios corruptos",
      "Transparencia en financiamiento de campañas",
    ],
  },
];

const Propuestas = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              PLAN DE GOBIERNO
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Propuestas para un <span className="text-primary">Perú Mejor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un plan integral y realizable para transformar cada aspecto de nuestra sociedad. 
              Propuestas concretas con metas medibles.
            </p>
          </div>
        </div>
      </section>

      {/* Proposals */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {proposals.map((proposal, index) => (
              <div
                key={proposal.id}
                id={proposal.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={proposal.image}
                      alt={proposal.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                        <proposal.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">
                    {proposal.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black mt-2 mb-4">
                    {proposal.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {proposal.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {proposal.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-xl border px-6">
                <AccordionTrigger className="text-left font-bold">
                  ¿Cómo se financiarán estas propuestas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Mediante una reforma tributaria justa, eliminación del gasto superfluo, 
                  lucha frontal contra la corrupción y la evasión fiscal, y una gestión 
                  eficiente de los recursos del Estado.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-card rounded-xl border px-6">
                <AccordionTrigger className="text-left font-bold">
                  ¿Cuál es el plazo para implementar estas reformas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Cada propuesta tiene metas a corto plazo (primer año), mediano plazo 
                  (3 años) y largo plazo (5 años). Publicaremos informes de avance 
                  trimestrales para garantizar transparencia.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-card rounded-xl border px-6">
                <AccordionTrigger className="text-left font-bold">
                  ¿Cómo puedo participar en la elaboración de propuestas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Organizamos mesas de diálogo en todas las regiones y tenemos 
                  canales digitales para recibir propuestas ciudadanas. Tu voz es 
                  fundamental para construir el plan de gobierno.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-6">
            ¿Tienes Ideas para Mejorar el Perú?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Queremos escucharte. Envíanos tus propuestas y juntos construyamos 
            el plan de gobierno que el Perú necesita.
          </p>
          <Button 
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/contacto">
              Enviar mi Propuesta
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Propuestas;
