import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Partido from "./pages/Partido";
import Candidato from "./pages/Candidato";
import Propuestas from "./pages/Propuestas";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Contacto from "./pages/Contacto";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import Transparencia from "./pages/Transparencia";
import ScrollToTop from "./components/layout/ScrollToTop";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEventos from "./pages/admin/AdminEventos";
import AdminEventoForm from "./pages/admin/AdminEventoForm";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminNoticiaForm from "./pages/admin/AdminNoticiaForm";
import AdminMultimedia from "./pages/admin/AdminMultimedia";
import AdminRedesSociales from "./pages/admin/AdminRedesSociales";
import AdminConfiguracion from "./pages/admin/AdminConfiguracion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/partido" element={<Partido />} />
            <Route path="/candidato" element={<Candidato />} />
            <Route path="/propuestas" element={<Propuestas />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/transparencia" element={<Transparencia />} />

            {/* Admin Login (not protected) */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/eventos" element={<ProtectedRoute><AdminEventos /></ProtectedRoute>} />
            <Route path="/admin/eventos/nuevo" element={<ProtectedRoute><AdminEventoForm /></ProtectedRoute>} />
            <Route path="/admin/eventos/:id" element={<ProtectedRoute><AdminEventoForm /></ProtectedRoute>} />
            <Route path="/admin/noticias" element={<ProtectedRoute><AdminNoticias /></ProtectedRoute>} />
            <Route path="/admin/noticias/nuevo" element={<ProtectedRoute><AdminNoticiaForm /></ProtectedRoute>} />
            <Route path="/admin/noticias/:id" element={<ProtectedRoute><AdminNoticiaForm /></ProtectedRoute>} />
            <Route path="/admin/multimedia" element={<ProtectedRoute><AdminMultimedia /></ProtectedRoute>} />
            <Route path="/admin/redes-sociales" element={<ProtectedRoute><AdminRedesSociales /></ProtectedRoute>} />
            <Route path="/admin/configuracion" element={<ProtectedRoute><AdminConfiguracion /></ProtectedRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
