import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Save, Trash2, Loader2, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string | null;
  followers_count: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const AdminRedesSociales = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newLink, setNewLink] = useState({
    platform: "",
    username: "",
    url: "",
    followers_count: "",
  });

  useEffect(() => {
    fetchLinks();

    const channel = supabase
      .channel("social-links-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_links" },
        () => {
          fetchLinks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error("Error fetching social links:", error);
      toast.error("Error al cargar las redes sociales");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<SocialLink>) => {
    try {
      const { error } = await supabase
        .from("social_links")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      toast.success("Red social actualizada");
    } catch (error) {
      console.error("Error updating social link:", error);
      toast.error("Error al actualizar");
    }
  };

  const handleCreate = async () => {
    if (!newLink.platform || !newLink.username || !newLink.url) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from("social_links").insert([
        {
          platform: newLink.platform.toLowerCase(),
          username: newLink.username,
          url: newLink.url,
          followers_count: newLink.followers_count || null,
          display_order: links.length + 1,
          is_active: true,
        },
      ]);

      if (error) throw error;

      toast.success("Red social agregada");
      setNewLink({ platform: "", username: "", url: "", followers_count: "" });
      setShowNewForm(false);
    } catch (error) {
      console.error("Error creating social link:", error);
      toast.error("Error al crear la red social");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("social_links").delete().eq("id", id);
      if (error) throw error;
      toast.success("Red social eliminada");
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast.error("Error al eliminar");
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitter: "𝕏",
      instagram: "📷",
      tiktok: "🎵",
      facebook: "📘",
      youtube: "▶️",
    };
    return icons[platform.toLowerCase()] || "🔗";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground">Redes Sociales</h1>
            <p className="text-muted-foreground">
              Administra los enlaces de redes sociales visibles en el sitio
            </p>
          </div>
          <Button onClick={() => setShowNewForm(true)} disabled={showNewForm}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Red Social
          </Button>
        </div>

        {/* New Form */}
        {showNewForm && (
          <Card>
            <CardHeader>
              <CardTitle>Nueva Red Social</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plataforma *</Label>
                  <Input
                    placeholder="Ej: Twitter, Instagram, TikTok"
                    value={newLink.platform}
                    onChange={(e) =>
                      setNewLink((prev) => ({ ...prev, platform: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Usuario *</Label>
                  <Input
                    placeholder="Ej: @aprajheremy"
                    value={newLink.username}
                    onChange={(e) =>
                      setNewLink((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL *</Label>
                  <Input
                    placeholder="https://..."
                    value={newLink.url}
                    onChange={(e) =>
                      setNewLink((prev) => ({ ...prev, url: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Seguidores</Label>
                  <Input
                    placeholder="Ej: 15.2K"
                    value={newLink.followers_count}
                    onChange={(e) =>
                      setNewLink((prev) => ({ ...prev, followers_count: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewForm(false);
                    setNewLink({ platform: "", username: "", url: "", followers_count: "" });
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Links List */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : links.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay redes sociales configuradas</p>
              </div>
            ) : (
              <div className="divide-y">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    
                    <span className="text-2xl">{getPlatformIcon(link.platform)}</span>
                    
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <Input
                        value={link.platform}
                        onChange={(e) => {
                          setLinks((prev) =>
                            prev.map((l) =>
                              l.id === link.id ? { ...l, platform: e.target.value } : l
                            )
                          );
                        }}
                        onBlur={(e) => handleUpdate(link.id, { platform: e.target.value })}
                        placeholder="Plataforma"
                      />
                      <Input
                        value={link.username}
                        onChange={(e) => {
                          setLinks((prev) =>
                            prev.map((l) =>
                              l.id === link.id ? { ...l, username: e.target.value } : l
                            )
                          );
                        }}
                        onBlur={(e) => handleUpdate(link.id, { username: e.target.value })}
                        placeholder="Usuario"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => {
                          setLinks((prev) =>
                            prev.map((l) =>
                              l.id === link.id ? { ...l, url: e.target.value } : l
                            )
                          );
                        }}
                        onBlur={(e) => handleUpdate(link.id, { url: e.target.value })}
                        placeholder="URL"
                      />
                      <Input
                        value={link.followers_count || ""}
                        onChange={(e) => {
                          setLinks((prev) =>
                            prev.map((l) =>
                              l.id === link.id ? { ...l, followers_count: e.target.value } : l
                            )
                          );
                        }}
                        onBlur={(e) =>
                          handleUpdate(link.id, { followers_count: e.target.value })
                        }
                        placeholder="Seguidores"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={link.is_active || false}
                        onCheckedChange={(checked) =>
                          handleUpdate(link.id, { is_active: checked })
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar red social?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(link.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRedesSociales;
