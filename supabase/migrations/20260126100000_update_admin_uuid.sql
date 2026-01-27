-- Update admin UUID in all RLS policies
-- Replace placeholder with actual admin auth.uid()

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin can do everything with posts" ON posts;
DROP POLICY IF EXISTS "Admin can do everything with projects" ON projects;
DROP POLICY IF EXISTS "Admin can do everything with timeline" ON timeline_entries;
DROP POLICY IF EXISTS "Admin can do everything with categories" ON tech_categories;
DROP POLICY IF EXISTS "Admin can do everything with technologies" ON technologies;

-- Recreate with actual admin UUID
CREATE POLICY "Admin can do everything with posts"
ON posts FOR ALL
USING ((SELECT auth.uid()) = '03f685a9-4012-4374-abb5-42a0bed3b142'::uuid);

CREATE POLICY "Admin can do everything with projects"
ON projects FOR ALL
USING ((SELECT auth.uid()) = '03f685a9-4012-4374-abb5-42a0bed3b142'::uuid);

CREATE POLICY "Admin can do everything with timeline"
ON timeline_entries FOR ALL
USING ((SELECT auth.uid()) = '03f685a9-4012-4374-abb5-42a0bed3b142'::uuid);

CREATE POLICY "Admin can do everything with categories"
ON tech_categories FOR ALL
USING ((SELECT auth.uid()) = '03f685a9-4012-4374-abb5-42a0bed3b142'::uuid);

CREATE POLICY "Admin can do everything with technologies"
ON technologies FOR ALL
USING ((SELECT auth.uid()) = '03f685a9-4012-4374-abb5-42a0bed3b142'::uuid);
