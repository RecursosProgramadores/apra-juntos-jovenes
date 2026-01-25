import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Gran Mitin de Cierre - Lima",
    date: "10 Mar 2025",
    time: "4:00 PM",
    location: "Estadio Nacional, Lima",
    type: "Mitin",
    description: "El evento más grande de la campaña. Únete a miles de peruanos comprometidos con el cambio.",
    featured: true,
  },
  {
    id: 2,
    title: "Caravana de la Victoria - Arequipa",
    date: "28 Feb 2025",
    time: "10:00 AM",
    location: "Plaza de Armas, Arequipa",
    type: "Caravana",
    description: "Recorrido por las principales calles de la Ciudad Blanca con actividades y música.",
  },
  {
    id: 3,
    title: "Webinar: Propuestas para la Juventud",
    date: "25 Feb 2025",
    time: "7:00 PM",
    location: "Virtual - Zoom",
    type: "Virtual",
    description: "Jheremy presenta su plan integral para empoderar a los jóvenes peruanos.",
  },
  {
    id: 4,
    title: "Mitin Juvenil - Lima Norte",
    date: "20 Feb 2025",
    time: "5:00 PM",
    location: "Plaza Cívica, Los Olivos",
    type: "Mitin",
    description: "Encuentro con jóvenes líderes de Lima Norte para dialogar sobre sus propuestas.",
  },
  {
    id: 5,
    title: "Debate Universitario - UNMSM",
    date: "18 Feb 2025",
    time: "11:00 AM",
    location: "Auditorio Principal, UNMSM",
    type: "Debate",
    description: "Debate abierto con estudiantes sobre educación, empleo y futuro del país.",
  },
  {
    id: 6,
    title: "Caravana del Norte - Trujillo",
    date: "15 Feb 2025",
    time: "9:00 AM",
    location: "Plaza de Armas, Trujillo",
    type: "Caravana",
    description: "Inicio de la gran caravana que recorrerá todo el norte del Perú.",
  },
];

const Eventos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              AGENDA
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Eventos de <span className="text-primary">Campaña</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Participa en nuestros eventos y sé parte del movimiento que 
              transformará el Perú. ¡Te esperamos!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {events.filter(e => e.featured).map((event) => (
        <section key={event.id} className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary-foreground/20 text-primary-foreground mb-4">
                ⭐ Evento Destacado
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
                {event.title}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6">
                {event.description}
              </p>
              <div className="flex flex-wrap gap-6 mb-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Confirmar Asistencia
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      ))}

      {/* Events List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Próximos <span className="text-primary">Eventos</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.filter(e => !e.featured).map((event) => (
              <article
                key={event.id}
                className="bg-card rounded-2xl border p-6 hover:border-primary transition-all card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${event.type === "Mitin" ? "bg-primary/10 text-primary" : ""}
                      ${event.type === "Caravana" ? "bg-orange-100 text-orange-600" : ""}
                      ${event.type === "Virtual" ? "bg-blue-100 text-blue-600" : ""}
                      ${event.type === "Debate" ? "bg-purple-100 text-purple-600" : ""}
                    `}
                  >
                    {event.type === "Virtual" && <Video className="h-3 w-3 mr-1" />}
                    {event.type === "Mitin" && <Users className="h-3 w-3 mr-1" />}
                    {event.type}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Más información
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Integration */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Añade los Eventos a tu <span className="text-primary">Calendario</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            No te pierdas ningún evento. Sincroniza nuestra agenda con tu 
            calendario personal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Google Calendar
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Apple Calendar
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Outlook
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-background mb-6">
            ¿Quieres Organizar un Evento?
          </h2>
          <p className="text-lg text-background/70 mb-8 max-w-xl mx-auto">
            Si deseas organizar un evento de campaña en tu comunidad, 
            contáctanos y te ayudaremos.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contacto">
              Contáctanos
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Eventos;
