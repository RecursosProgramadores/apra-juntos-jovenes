import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Evento {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  type: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  created_at: string;
}

const AdminEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
    fetchEventos();

    // Set up realtime subscription
    const channel = supabase
      .channel("eventos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "eventos" },
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
    try {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setEventos(data || []);
    } catch (error) {
      console.error("Error fetching eventos:", error);
      toast.error("Error al cargar los eventos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id);
      if (error) throw error;
      toast.success("Evento eliminado correctamente");
    } catch (error) {
      console.error("Error deleting evento:", error);
      toast.error("Error al eliminar el evento");
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("eventos")
        .update({ is_published: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      toast.success(currentStatus ? "Evento despublicado" : "Evento publicado");
    } catch (error) {
      console.error("Error updating evento:", error);
      toast.error("Error al actualizar el evento");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredEventos = eventos
    .filter((evento) => {
      if (filter === "upcoming") return evento.date >= today;
      if (filter === "past") return evento.date < today;
      return true;
    })
    .filter((evento) =>
      evento.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground">Gestionar Eventos</h1>
            <p className="text-muted-foreground">
              Administra la agenda de eventos de la campaña
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/eventos/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === "upcoming" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("upcoming")}
                >
                  Próximos
                </Button>
                <Button
                  variant={filter === "past" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("past")}
                >
                  Pasados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredEventos.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay eventos</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "No se encontraron eventos con ese término"
                    : "Crea tu primer evento para empezar"}
                </p>
                <Button asChild>
                  <Link to="/admin/eventos/nuevo">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Evento
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEventos.map((evento) => (
                      <TableRow key={evento.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {evento.is_featured && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                                ⭐
                              </Badge>
                            )}
                            <span className="max-w-[200px] truncate">{evento.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(evento.date), "d MMM yyyy", { locale: es })}
                            {evento.time && ` • ${evento.time}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm max-w-[150px] truncate">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            {evento.location || "-"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{evento.type || "Otro"}</Badge>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => togglePublish(evento.id, evento.is_published || false)}
                            className="cursor-pointer"
                          >
                            <Badge
                              className={
                                evento.is_published
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              }
                            >
                              {evento.is_published ? "Publicado" : "Borrador"}
                            </Badge>
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/eventos`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/admin/eventos/${evento.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. El evento será eliminado
                                    permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(evento.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEventos;
