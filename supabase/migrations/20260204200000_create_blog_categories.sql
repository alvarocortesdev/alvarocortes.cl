-- Migration: Create blog_categories table
-- Description: Creates blog_categories for CMS-managed categories with i18n support
-- Author: Claude (automated migration)
-- Date: 2026-02-04

-- ============================================
-- BLOG CATEGORIES TABLE
-- ============================================

CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    name_en TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_blog_categories_display_order ON blog_categories(display_order);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Public can read all categories
CREATE POLICY "Public can read all blog categories"
    ON blog_categories
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Admin can manage categories (uses same UUID pattern as other tables)
CREATE POLICY "Admin can manage blog categories"
    ON blog_categories
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = '117781790')
    WITH CHECK (auth.uid()::text = '117781790');

-- ============================================
-- MIGRATE EXISTING CATEGORIES
-- ============================================

-- Insert unique categories from existing posts
INSERT INTO blog_categories (name, name_en, display_order)
SELECT DISTINCT
    category as name,
    category as name_en,
    ROW_NUMBER() OVER (ORDER BY category) - 1 as display_order
FROM posts
WHERE category IS NOT NULL AND category != ''
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- ADD CATEGORY_ID TO POSTS
-- ============================================

-- Add category_id column
ALTER TABLE posts ADD COLUMN category_id UUID REFERENCES blog_categories(id);

-- Populate category_id from existing category strings
UPDATE posts
SET category_id = blog_categories.id
FROM blog_categories
WHERE posts.category = blog_categories.name;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE blog_categories IS 'Blog post categories with i18n support';
COMMENT ON COLUMN blog_categories.name IS 'Category name in Spanish (primary)';
COMMENT ON COLUMN blog_categories.name_en IS 'Category name in English (optional)';
COMMENT ON COLUMN blog_categories.display_order IS 'Order in which to display (lower = first)';
COMMENT ON COLUMN posts.category_id IS 'Foreign key to blog_categories table';
