import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, Users, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Evento {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  type: string | null;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  is_featured: boolean | null;
}

const Eventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventos();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('eventos-public')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'eventos' },
        () => {
          fetchEventos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEventos = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('is_published', true)
      .gte('date', today)
      .order('date', { ascending: true });

    if (!error && data) {
      setEventos(data);
    }
    setIsLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "d MMM yyyy", { locale: es });
  };

  const featuredEvent = eventos.find(e => e.is_featured);
  const regularEvents = eventos.filter(e => !e.is_featured);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

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
      {featuredEvent && (
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary-foreground/20 text-primary-foreground mb-4">
                ⭐ Evento Destacado
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
                {featuredEvent.title}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-6 mb-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(featuredEvent.date)}</span>
                </div>
                {featuredEvent.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{featuredEvent.time}</span>
                  </div>
                )}
                {featuredEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{featuredEvent.location}</span>
                  </div>
                )}
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
      )}

      {/* Events List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Próximos <span className="text-primary">Eventos</span>
          </h2>

          {regularEvents.length === 0 && !featuredEvent ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg italic">
                Aún no hay eventos registrados. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEvents.map((event) => (
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
                        ${event.type === "Virtual" || event.type === "Webinar" ? "bg-blue-100 text-blue-600" : ""}
                        ${event.type === "Debate" ? "bg-purple-100 text-purple-600" : ""}
                        ${!["Mitin", "Caravana", "Virtual", "Webinar", "Debate"].includes(event.type || "") ? "bg-muted text-muted-foreground" : ""}
                      `}
                    >
                      {(event.type === "Virtual" || event.type === "Webinar") && <Video className="h-3 w-3 mr-1" />}
                      {event.type === "Mitin" && <Users className="h-3 w-3 mr-1" />}
                      {event.type || "Evento"}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(event.date)} {event.time && `• ${event.time}`}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full">
                    Más información
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </article>
              ))}
            </div>
          )}
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