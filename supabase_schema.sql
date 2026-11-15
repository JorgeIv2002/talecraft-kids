-- ==============================================================================
-- SUPABASE SCHEMA: TALECRAFT KIDS
-- Base de datos relacional para la app móvil de cuentos interactivos infantiles
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE PERFILES INFANTILES
CREATE TABLE IF NOT EXISTS public.child_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age SMALLINT NOT NULL CHECK (age BETWEEN 3 AND 14),
    pet_name VARCHAR(100) DEFAULT 'Chispas',
    stars_count INTEGER DEFAULT 0 CHECK (stars_count >= 0),
    favorite_value VARCHAR(50) DEFAULT 'Amistad',
    avatar_emoji VARCHAR(10) DEFAULT '🦊',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABLA DE CUENTOS (STORIES)
CREATE TABLE IF NOT EXISTS public.stories (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT NOT NULL,
    value_category VARCHAR(50) NOT NULL,
    estimated_minutes SMALLINT NOT NULL DEFAULT 5,
    cover_emoji VARCHAR(10) NOT NULL DEFAULT '📖',
    accent_color VARCHAR(10) DEFAULT '#D9532F',
    decisions_count SMALLINT DEFAULT 3,
    start_node_id VARCHAR(100),
    is_premium BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABLA DE NODOS/CAPÍTULOS DEL CUENTO (STORY NODES)
CREATE TABLE IF NOT EXISTS public.story_nodes (
    id VARCHAR(100) PRIMARY KEY,
    story_id VARCHAR(100) REFERENCES public.stories(id) ON DELETE CASCADE,
    chapter_number SMALLINT NOT NULL,
    total_chapters SMALLINT NOT NULL,
    scene_emoji VARCHAR(10) NOT NULL,
    story_text TEXT NOT NULL,
    is_ending BOOLEAN DEFAULT FALSE,
    moral_lesson_title VARCHAR(255),
    moral_lesson_desc TEXT,
    stars_awarded SMALLINT DEFAULT 1
);

-- 5. TABLA DE BIFURCACIONES Y ELECCIONES (CHOICES)
CREATE TABLE IF NOT EXISTS public.story_choices (
    id VARCHAR(100) PRIMARY KEY,
    node_id VARCHAR(100) REFERENCES public.story_nodes(id) ON DELETE CASCADE,
    next_node_id VARCHAR(100) REFERENCES public.story_nodes(id) ON DELETE CASCADE,
    choice_label TEXT NOT NULL,
    choice_hint TEXT,
    choice_order SMALLINT DEFAULT 1
);

-- 6. REGISTRO DE LECTURAS Y ESTRELLAS (READING LOGS)
CREATE TABLE IF NOT EXISTS public.reading_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.child_profiles(id) ON DELETE CASCADE,
    story_id VARCHAR(100) REFERENCES public.stories(id) ON DELETE SET NULL,
    stars_earned SMALLINT DEFAULT 1,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_child_profiles_user ON public.child_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_story_nodes_story ON public.story_nodes(story_id);
CREATE INDEX IF NOT EXISTS idx_story_choices_node ON public.story_choices(node_id);
CREATE INDEX IF NOT EXISTS idx_reading_logs_profile ON public.reading_logs(profile_id);

-- 8. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_logs ENABLE ROW LEVEL SECURITY;

-- Cuentos públicos para lectura
CREATE POLICY "Cuentos visibles para todos" ON public.stories
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Nodos visibles para todos" ON public.story_nodes
    FOR SELECT USING (TRUE);

CREATE POLICY "Elecciones visibles para todos" ON public.story_choices
    FOR SELECT USING (TRUE);

-- Perfiles y registros protegidos por usuario autenticado
CREATE POLICY "Los padres solo gestionan los perfiles de sus hijos" ON public.child_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Los padres ven las lecturas de sus hijos" ON public.reading_logs
    FOR ALL USING (
        profile_id IN (SELECT id FROM public.child_profiles WHERE user_id = auth.uid())
    );
