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
import turismoImg from "@/assets/turismo.jpg";
import pymesImg from "@/assets/pymes.jpg";
import seguridadImg from "@/assets/seguridad.jpg";


const proposals = [
  {
    id: "salud-infra",
    title: "Salud e Infraestructura Médica",
    subtitle: "Modernización y Acceso",
    icon: Heart,
    image: healthcareImg,
    description: "Nivel de atención superior y protección social para todos los sectores de la sociedad.",
    points: [
      "Promover la construcción del Hospital IV EsSalud Huánuco y el Hospital II EsSalud de Tingo María.",
      "Promover bajo una ley la autonomía administrativa, política y económica de EsSalud del Perú.",
      "Seguro para los transportistas, artistas y periodistas en EsSalud con una ley especial.",
    ],
  },
  {
    id: "desarrollo-vial",
    title: "Corredores Viales y Conectividad",
    subtitle: "Huánuco Conectado al Mundo",
    icon: TrendingUp,
    image: economyImg,
    description: "Infraestructura vial estratégica para dinamizar el comercio nacional e internacional.",
    points: [
      "Promover una ley regional para un Corredor Vial Central de Pasco a Tingo María (Autopista).",
      "Promover una ley nacional para un Corredor Central Puerto Chancay a Brasil que pase por la región Huánuco.",
    ],
  },
  {
    id: "agro-turismo",
    title: "Agroindustrial y Turismo",
    subtitle: "Productividad y Riqueza",
    icon: Leaf,
    image: turismoImg,
    description: "Leyes especiales para potenciar nuestras ventajas competitivas naturales.",
    points: [
      "Sacar Ley Especial para el Turismo en la región de Huánuco.",
      "Sacar Ley Especial para el Agro y Agroindustrial para exportación de productos agrícolas.",
    ],
  },
  {
    id: "creditos-pymes",
    title: "Economía y Trabajo",
    subtitle: "Motor del Desarrollo",
    icon: Users,
    image: pymesImg,
    description: "Facilidades financieras y justicia laboral para el crecimiento integral.",
    points: [
      "Sacar Ley Regional para Créditos Agrarios y Micro Empresas (PYMES): Pequeña, Mediana y la Gran Empresa.",
      "Elaborar y proponer un Código Laboral para todos los trabajadores del Perú.",
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad Ciudadana",
    subtitle: "Paz y Tranquilidad",
    icon: Shield,
    image: seguridadImg,
    description: "Tecnología y patrullaje para garantizar la tranquilidad de las familias huanuqueñas.",
    points: [
      "Potenciaremos el patrullaje integrado con drones y vigilancia inteligente.",
      "Centros de monitoreo modernos y leyes más severas contra la delincuencia.",
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
              PLAN REGIONAL HUÁNUCO
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              PROPUESTAS REGIONALES <br />
              <span className="text-primary">JORGE ALVARADO LINO</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nuestras propuestas reales para transformar Huánuco. Compromisos firmes con la salud,
              la infraestructura y el desarrollo económico de nuestra región.
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
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
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
