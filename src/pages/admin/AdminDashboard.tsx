import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Newspaper, Plus, TrendingUp, Clock, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface StatsData {
  totalEventos: number;
  eventosProximos: number;
  totalNoticias: number;
  noticiasPublicadas: number;
}

interface RecentItem {
  id: string;
  title: string;
  created_at: string;
  is_published: boolean;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatsData>({
    totalEventos: 0,
    eventosProximos: 0,
    totalNoticias: 0,
    noticiasPublicadas: 0,
  });
  const [recentEventos, setRecentEventos] = useState<RecentItem[]>([]);
  const [recentNoticias, setRecentNoticias] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch eventos stats
      const { data: eventos, error: eventosError } = await supabase
        .from("eventos")
        .select("id, title, date, created_at, is_published");

      if (eventosError) throw eventosError;

      const today = new Date().toISOString().split("T")[0];
      const eventosProximos = eventos?.filter(e => e.date >= today) || [];

      // Fetch noticias stats
      const { data: noticias, error: noticiasError } = await supabase
        .from("noticias")
        .select("id, title, created_at, is_published");

      if (noticiasError) throw noticiasError;

      const noticiasPublicadas = noticias?.filter(n => n.is_published) || [];

      setStats({
        totalEventos: eventos?.length || 0,
        eventosProximos: eventosProximos.length,
        totalNoticias: noticias?.length || 0,
        noticiasPublicadas: noticiasPublicadas.length,
      });

      // Recent items
      setRecentEventos(
        (eventos || [])
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3)
      );

      setRecentNoticias(
        (noticias || [])
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3)
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Eventos Próximos",
      value: stats.eventosProximos,
      total: stats.totalEventos,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/admin/eventos",
    },
    {
      title: "Noticias Publicadas",
      value: stats.noticiasPublicadas,
      total: stats.totalNoticias,
      icon: Newspaper,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/admin/noticias",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido al panel de administración de APRA
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/admin/eventos/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/noticias/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Noticia
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold mt-1">
                        {stat.value}
                        <span className="text-lg text-muted-foreground font-normal">
                          /{stat.total}
                        </span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Quick Actions */}
          <Card className="sm:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Acciones Rápidas</h3>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link to="/admin/eventos/nuevo">
                    <Calendar className="h-4 w-4 mr-2" />
                    Crear Evento
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link to="/admin/noticias/nuevo">
                    <Newspaper className="h-4 w-4 mr-2" />
                    Crear Noticia
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link to="/" target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Sitio
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link to="/admin/multimedia">
                    <Plus className="h-4 w-4 mr-2" />
                    Subir Imagen
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Últimos Eventos</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/eventos">Ver todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentEventos.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No hay eventos creados aún
                </p>
              ) : (
                <div className="space-y-3">
                  {recentEventos.map((evento) => (
                    <Link
                      key={evento.id}
                      to={`/admin/eventos/${evento.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{evento.title}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(evento.created_at), "d MMM yyyy", { locale: es })}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          evento.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {evento.is_published ? "Publicado" : "Borrador"}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Últimas Noticias</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/noticias">Ver todas</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentNoticias.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No hay noticias creadas aún
                </p>
              ) : (
                <div className="space-y-3">
                  {recentNoticias.map((noticia) => (
                    <Link
                      key={noticia.id}
                      to={`/admin/noticias/${noticia.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{noticia.title}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(noticia.created_at), "d MMM yyyy", { locale: es })}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          noticia.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {noticia.is_published ? "Publicado" : "Borrador"}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
