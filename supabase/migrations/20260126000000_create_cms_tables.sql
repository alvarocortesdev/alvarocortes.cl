-- Migration: Create CMS Tables
-- Description: Creates all tables for alvarocortes.cl CMS
-- Tables: posts, projects, timeline_entries, tech_categories, technologies
-- Author: Claude (automated migration)
-- Date: 2026-01-26

-- ============================================
-- ENUM TYPES
-- ============================================

-- Post status enum
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');

-- Timeline entry type enum
CREATE TYPE timeline_entry_type AS ENUM ('work', 'studies');

-- ============================================
-- TABLES
-- ============================================

-- Posts table
-- Stores blog posts with content, metadata, and publication status
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    status post_status NOT NULL DEFAULT 'draft',
    author TEXT NOT NULL DEFAULT 'Alvaro Cortes',
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects table
-- Stores portfolio projects with tech stack and links
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    details TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    live_url TEXT,
    repo_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Timeline entries table
-- Stores work history and education entries
CREATE TABLE timeline_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type timeline_entry_type NOT NULL,
    period TEXT NOT NULL,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tech categories table
-- Groups technologies by category (Frontend, Backend, Tools, etc.)
CREATE TABLE tech_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Technologies table
-- Individual technologies belonging to categories
CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES tech_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, name)
);

-- ============================================
-- INDEXES
-- ============================================

-- Posts indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_status_published_at ON posts(status, published_at DESC);

-- Projects indexes
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- Timeline indexes
CREATE INDEX idx_timeline_entries_type ON timeline_entries(type);
CREATE INDEX idx_timeline_entries_display_order ON timeline_entries(display_order);

-- Tech categories indexes
CREATE INDEX idx_tech_categories_display_order ON tech_categories(display_order);

-- Technologies indexes
CREATE INDEX idx_technologies_category_id ON technologies(category_id);
CREATE INDEX idx_technologies_display_order ON technologies(display_order);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_entries_updated_at
    BEFORE UPDATE ON timeline_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_categories_updated_at
    BEFORE UPDATE ON tech_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technologies_updated_at
    BEFORE UPDATE ON technologies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES
-- ============================================

-- Posts: Public can read only published posts
CREATE POLICY "Public can read published posts"
    ON posts
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Projects: Public can read all projects
CREATE POLICY "Public can read all projects"
    ON projects
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Timeline entries: Public can read all entries
CREATE POLICY "Public can read all timeline entries"
    ON timeline_entries
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Tech categories: Public can read all categories
CREATE POLICY "Public can read all tech categories"
    ON tech_categories
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Technologies: Public can read all technologies
CREATE POLICY "Public can read all technologies"
    ON technologies
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- ============================================
-- ADMIN WRITE POLICIES
-- Note: Replace 'ADMIN_UUID_PLACEHOLDER' with actual admin user UUID
-- after first OAuth login in Phase 14
-- ============================================

-- Posts: Admin can do everything
CREATE POLICY "Admin can manage posts"
    ON posts
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER')
    WITH CHECK (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER');

-- Projects: Admin can do everything
CREATE POLICY "Admin can manage projects"
    ON projects
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER')
    WITH CHECK (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER');

-- Timeline entries: Admin can do everything
CREATE POLICY "Admin can manage timeline entries"
    ON timeline_entries
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER')
    WITH CHECK (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER');

-- Tech categories: Admin can do everything
CREATE POLICY "Admin can manage tech categories"
    ON tech_categories
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER')
    WITH CHECK (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER');

-- Technologies: Admin can do everything
CREATE POLICY "Admin can manage technologies"
    ON technologies
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER')
    WITH CHECK (auth.uid()::text = 'ADMIN_UUID_PLACEHOLDER');

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE posts IS 'Blog posts with content, metadata, and publication status';
COMMENT ON TABLE projects IS 'Portfolio projects with tech stack and external links';
COMMENT ON TABLE timeline_entries IS 'Work history and education timeline entries';
COMMENT ON TABLE tech_categories IS 'Technology categories for grouping skills';
COMMENT ON TABLE technologies IS 'Individual technologies within categories';

COMMENT ON COLUMN posts.slug IS 'URL-friendly unique identifier for the post';
COMMENT ON COLUMN posts.status IS 'Publication status: draft, published, or archived';
COMMENT ON COLUMN posts.tags IS 'Array of tag strings for categorization';
COMMENT ON COLUMN posts.published_at IS 'Timestamp when post was/will be published';

COMMENT ON COLUMN projects.tech_stack IS 'Array of technology names used in the project';
COMMENT ON COLUMN projects.featured IS 'Whether to highlight this project prominently';
COMMENT ON COLUMN projects.display_order IS 'Order in which to display (lower = first)';

COMMENT ON COLUMN timeline_entries.type IS 'Entry type: work or studies';
COMMENT ON COLUMN timeline_entries.period IS 'Time period (e.g., "2020", "2019-2021")';

COMMENT ON COLUMN technologies.icon IS 'Icon identifier for simple-icons CDN';
