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
import { Plus, Search, Edit, Trash2, Eye, Newspaper, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Noticia {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  publish_date: string | null;
  is_published: boolean | null;
  created_at: string;
  image_url: string | null;
}

const AdminNoticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchNoticias();

    // Set up realtime subscription
    const channel = supabase
      .channel("noticias-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "noticias" },
        () => {
          fetchNoticias();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNoticias = async () => {
    try {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNoticias(data || []);
    } catch (error) {
      console.error("Error fetching noticias:", error);
      toast.error("Error al cargar las noticias");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("noticias").delete().eq("id", id);
      if (error) throw error;
      toast.success("Noticia eliminada correctamente");
    } catch (error) {
      console.error("Error deleting noticia:", error);
      toast.error("Error al eliminar la noticia");
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("noticias")
        .update({ is_published: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      toast.success(currentStatus ? "Noticia despublicada" : "Noticia publicada");
    } catch (error) {
      console.error("Error updating noticia:", error);
      toast.error("Error al actualizar la noticia");
    }
  };

  const filteredNoticias = noticias
    .filter((noticia) => {
      if (filter === "published") return noticia.is_published;
      if (filter === "draft") return !noticia.is_published;
      return true;
    })
    .filter((noticia) =>
      noticia.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground">Gestionar Noticias</h1>
            <p className="text-muted-foreground">
              Administra las noticias y artículos de la campaña
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/noticias/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Noticia
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
                  placeholder="Buscar noticias..."
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
                  Todas
                </Button>
                <Button
                  variant={filter === "published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("published")}
                >
                  Publicadas
                </Button>
                <Button
                  variant={filter === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("draft")}
                >
                  Borradores
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
            ) : filteredNoticias.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay noticias</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "No se encontraron noticias con ese término"
                    : "Crea tu primera noticia para empezar"}
                </p>
                <Button asChild>
                  <Link to="/admin/noticias/nuevo">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Noticia
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNoticias.map((noticia) => (
                      <TableRow key={noticia.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            {noticia.image_url && (
                              <img
                                src={noticia.image_url}
                                alt=""
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <span className="max-w-[250px] truncate">{noticia.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{noticia.category || "General"}</Badge>
                        </TableCell>
                        <TableCell>
                          {noticia.publish_date
                            ? format(new Date(noticia.publish_date), "d MMM yyyy", { locale: es })
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => togglePublish(noticia.id, noticia.is_published || false)}
                            className="cursor-pointer"
                          >
                            <Badge
                              className={
                                noticia.is_published
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              }
                            >
                              {noticia.is_published ? "Publicada" : "Borrador"}
                            </Badge>
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/noticias`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/admin/noticias/${noticia.id}`}>
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
                                  <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. La noticia será eliminada
                                    permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(noticia.id)}
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

export default AdminNoticias;
