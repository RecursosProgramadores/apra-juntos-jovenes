import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsArticles = [
  {
    id: 1,
    title: "Jheremy presenta plan de educación digital para el Perú",
    excerpt: "El candidato del APRA anunció un ambicioso programa para dotar de tecnología a todas las escuelas públicas del país.",
    date: "24 Ene 2025",
    category: "Educación",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  },
  {
    id: 2,
    title: "APRA lidera encuestas en intención de voto juvenil",
    excerpt: "Según las últimas encuestas, el partido aprista cuenta con el mayor apoyo entre votantes de 18 a 35 años.",
    date: "22 Ene 2025",
    category: "Campaña",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
  },
  {
    id: 3,
    title: "Caravana de la Victoria recorre el norte del país",
    excerpt: "Miles de simpatizantes acompañaron a Jheremy en su recorrido por Trujillo, Chiclayo y Piura.",
    date: "20 Ene 2025",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: 4,
    title: "Propuesta anti-corrupción recibe respaldo ciudadano",
    excerpt: "El plan de transparencia y gobierno abierto presentado por el APRA ha sido bien recibido por organizaciones civiles.",
    date: "18 Ene 2025",
    category: "Propuestas",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
  },
  {
    id: 5,
    title: "Jóvenes líderes se suman a la campaña aprista",
    excerpt: "Destacados activistas y emprendedores juveniles anuncian su apoyo al candidato Jheremy.",
    date: "15 Ene 2025",
    category: "Campaña",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  },
  {
    id: 6,
    title: "APRA firma compromiso por el medio ambiente",
    excerpt: "El partido se comprometió a proteger la Amazonía y promover energías limpias durante el próximo gobierno.",
    date: "12 Ene 2025",
    category: "Medio Ambiente",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  },
];

const categories = ["Todos", "Educación", "Campaña", "Propuestas", "Eventos", "Medio Ambiente"];

const Noticias = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              ACTUALIDAD
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Noticias de la <span className="text-primary">Campaña</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mantente informado sobre las últimas novedades de nuestra campaña, 
              eventos y propuestas.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Todos" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-card rounded-2xl overflow-hidden border hover:border-primary transition-all card-hover"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {article.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Leer más
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más noticias
            </Button>
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Síguenos en <span className="text-primary">Redes Sociales</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://twitter.com/apraperu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @ApraJheremy
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/jheremy_apra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-background rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @jheremy_apra
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@aprajheremy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              @aprajheremy
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
