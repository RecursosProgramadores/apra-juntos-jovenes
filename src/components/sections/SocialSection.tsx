import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  followers_count: string | null;
}

interface Evento {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  type: string | null;
  image_url: string | null;
}

const getIconSvg = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'x':
    case 'twitter':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
  }
};

const getIconBackground = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400";
    case 'facebook':
      return "bg-blue-600";
    case 'youtube':
      return "bg-red-600";
    default:
      return "bg-foreground";
  }
};

// Static fallback data
const staticSocialLinks = [
  { id: '1', platform: 'X', username: '@ApraJheremy', url: '#', followers_count: '125K' },
  { id: '2', platform: 'TikTok', username: '@aprajheremy', url: '#', followers_count: '89K' },
  { id: '3', platform: 'Instagram', username: '@jheremy_apra', url: '#', followers_count: '210K' },
];

const staticEvents = [
  { id: '1', title: 'Mitin Juvenil - Lima Norte', date: '2025-02-15', time: '5:00 PM', location: 'Plaza Cívica, Los Olivos', type: 'Mitin', image_url: null },
  { id: '2', title: 'Webinar: Propuestas para la Juventud', date: '2025-02-20', time: '7:00 PM', location: 'Virtual - Zoom', type: 'Virtual', image_url: null },
  { id: '3', title: 'Caravana de la Victoria - Arequipa', date: '2025-02-28', time: '10:00 AM', location: 'Plaza de Armas, Arequipa', type: 'Caravana', image_url: null },
];

export const SocialSection = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(staticSocialLinks);
  const [eventos, setEventos] = useState<Evento[]>(staticEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // Subscribe to realtime updates
    const socialChannel = supabase
      .channel('social-links-home')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'social_links' }, fetchData)
      .subscribe();

    const eventosChannel = supabase
      .channel('eventos-home')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'eventos' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(socialChannel);
      supabase.removeChannel(eventosChannel);
    };
  }, []);

  const fetchData = async () => {
    // Fetch social links
    const { data: linksData } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (linksData && linksData.length > 0) {
      setSocialLinks(linksData);
    }

    // Fetch upcoming events (max 3)
    const today = new Date().toISOString().split('T')[0];
    const { data: eventosData } = await supabase
      .from('eventos')
      .select('*')
      .eq('is_published', true)
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(3);

    if (eventosData && eventosData.length > 0) {
      setEventos(eventosData);
    }

    setIsLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "d MMM yyyy", { locale: es });
  };

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Social Media */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
              SÍGUENOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Únete a la <span className="text-primary">Conversación</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Mantente conectado con las últimas noticias, eventos y propuestas 
              a través de nuestras redes sociales.
            </p>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/5 hover:bg-background/10 transition-colors group"
                  >
                    <div className={`w-14 h-14 rounded-xl ${getIconBackground(social.platform)} flex items-center justify-center text-background`}>
                      {getIconSvg(social.platform)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-background">{social.platform}</h4>
                      <p className="text-sm text-background/60">{social.username}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-primary">{social.followers_count || '-'}</span>
                      <p className="text-xs text-background/50">seguidores</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-background/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
              PRÓXIMOS EVENTOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Agenda de <span className="text-primary">Campaña</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Participa en nuestros eventos y sé parte del movimiento 
              que transformará el Perú.
            </p>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {eventos.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-xl bg-background/5 border border-background/10 hover:border-primary/50 transition-colors overflow-hidden"
                  >
                    <div className="flex gap-4">
                      {event.image_url && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2">
                              {event.type || 'Evento'}
                            </span>
                            <h4 className="font-bold text-lg text-background line-clamp-1">{event.title}</h4>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-background/60">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatDate(event.date)} {event.time && `• ${event.time}`}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button variant="hero" size="lg" className="mt-8 w-full" asChild>
              <Link to="/eventos">
                Ver Todos los Eventos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
