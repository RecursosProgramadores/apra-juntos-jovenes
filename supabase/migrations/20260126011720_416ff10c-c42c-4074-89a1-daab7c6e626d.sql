-- =============================================
-- APRA Campaign Admin Panel - Database Schema
-- =============================================

-- 1. Create admin check function (SECURITY DEFINER to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email = 'apracampaña@gmail.com'
  )
$$;

-- 2. Create eventos table
CREATE TABLE public.eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  description TEXT,
  type TEXT DEFAULT 'Mitin' CHECK (type IN ('Mitin', 'Webinar', 'Caravana', 'Debate', 'Otro')),
  image_url TEXT,
  video_url TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Create noticias table
CREATE TABLE public.noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  category TEXT DEFAULT 'General',
  publish_date DATE DEFAULT CURRENT_DATE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Create social_links table for the "Síguenos" section
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  followers_count TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Create admin_settings table for general settings
CREATE TABLE public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. Enable RLS on all tables
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for eventos
-- Public can view published events
CREATE POLICY "Public can view published eventos"
ON public.eventos FOR SELECT
USING (is_published = true OR public.is_admin());

-- Admin can insert eventos
CREATE POLICY "Admin can insert eventos"
ON public.eventos FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin can update eventos
CREATE POLICY "Admin can update eventos"
ON public.eventos FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin can delete eventos
CREATE POLICY "Admin can delete eventos"
ON public.eventos FOR DELETE
TO authenticated
USING (public.is_admin());

-- 8. RLS Policies for noticias
-- Public can view published noticias
CREATE POLICY "Public can view published noticias"
ON public.noticias FOR SELECT
USING (is_published = true OR public.is_admin());

-- Admin can insert noticias
CREATE POLICY "Admin can insert noticias"
ON public.noticias FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin can update noticias
CREATE POLICY "Admin can update noticias"
ON public.noticias FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin can delete noticias
CREATE POLICY "Admin can delete noticias"
ON public.noticias FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9. RLS Policies for social_links
-- Public can view active social links
CREATE POLICY "Public can view active social_links"
ON public.social_links FOR SELECT
USING (is_active = true OR public.is_admin());

-- Admin can insert social_links
CREATE POLICY "Admin can insert social_links"
ON public.social_links FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin can update social_links
CREATE POLICY "Admin can update social_links"
ON public.social_links FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin can delete social_links
CREATE POLICY "Admin can delete social_links"
ON public.social_links FOR DELETE
TO authenticated
USING (public.is_admin());

-- 10. RLS Policies for admin_settings
-- Only admin can access settings
CREATE POLICY "Admin can view settings"
ON public.admin_settings FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin can insert settings"
ON public.admin_settings FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update settings"
ON public.admin_settings FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete settings"
ON public.admin_settings FOR DELETE
TO authenticated
USING (public.is_admin());

-- 11. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 12. Create triggers for updated_at
CREATE TRIGGER update_eventos_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_noticias_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 13. Create storage buckets for campaign media
INSERT INTO storage.buckets (id, name, public) VALUES ('campaign-images', 'campaign-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('campaign-videos', 'campaign-videos', true);

-- 14. Storage policies for campaign-images
CREATE POLICY "Public can view campaign images"
ON storage.objects FOR SELECT
USING (bucket_id = 'campaign-images');

CREATE POLICY "Admin can upload campaign images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'campaign-images' AND public.is_admin());

CREATE POLICY "Admin can update campaign images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'campaign-images' AND public.is_admin());

CREATE POLICY "Admin can delete campaign images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'campaign-images' AND public.is_admin());

-- 15. Storage policies for campaign-videos
CREATE POLICY "Public can view campaign videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'campaign-videos');

CREATE POLICY "Admin can upload campaign videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'campaign-videos' AND public.is_admin());

CREATE POLICY "Admin can update campaign videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'campaign-videos' AND public.is_admin());

CREATE POLICY "Admin can delete campaign videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'campaign-videos' AND public.is_admin());

-- 16. Enable realtime for eventos and noticias
ALTER PUBLICATION supabase_realtime ADD TABLE public.eventos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.noticias;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links;

-- 17. Insert default social links
INSERT INTO public.social_links (platform, username, url, icon, followers_count, display_order, is_active) VALUES
('twitter', '@ApraJheremy', 'https://twitter.com/apraperu', 'twitter', '15.2K', 1, true),
('instagram', '@jheremy_apra', 'https://instagram.com/jheremy_apra', 'instagram', '23.5K', 2, true),
('tiktok', '@aprajheremy', 'https://tiktok.com/@aprajheremy', 'tiktok', '45.8K', 3, true);