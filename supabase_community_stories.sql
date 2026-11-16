-- ==============================================================================
-- SUPABASE: TABLA DE CUENTOS COMUNITARIOS (TALECRAFT KIDS)
-- ==============================================================================
-- Instrucciones:
-- 1. Ve a tu panel de Supabase: https://supabase.com/dashboard/project/yswiunuavyfktgyzislo
-- 2. Entra en "SQL Editor" en el menú lateral izquierdo.
-- 3. Haz clic en "New query", pega este código y presiona "Run" (botón verde).
-- ==============================================================================

-- 1. Crear tabla para almacenar cuentos interactivos completos compartidos
CREATE TABLE IF NOT EXISTS public.community_stories (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,
    story_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;

-- 3. Permitir que cualquier visitante o niño lea los cuentos de la comunidad
DROP POLICY IF EXISTS "Lectura pública de cuentos comunitarios" ON public.community_stories;
CREATE POLICY "Lectura pública de cuentos comunitarios" ON public.community_stories
    FOR SELECT USING (true);

-- 4. Permitir que cualquier familia publique un nuevo cuento creado
DROP POLICY IF EXISTS "Creación pública de cuentos comunitarios" ON public.community_stories;
CREATE POLICY "Creación pública de cuentos comunitarios" ON public.community_stories
    FOR INSERT WITH CHECK (true);
