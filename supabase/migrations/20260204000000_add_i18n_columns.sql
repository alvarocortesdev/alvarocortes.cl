-- Posts: English versions of translatable fields
ALTER TABLE posts ADD COLUMN title_en TEXT;
ALTER TABLE posts ADD COLUMN excerpt_en TEXT;
ALTER TABLE posts ADD COLUMN content_en TEXT;

-- Projects: English versions
ALTER TABLE projects ADD COLUMN name_en TEXT;
ALTER TABLE projects ADD COLUMN description_en TEXT;
ALTER TABLE projects ADD COLUMN details_en TEXT;

-- Timeline: English versions (organization is NOT translated)
ALTER TABLE timeline_entries ADD COLUMN title_en TEXT;
ALTER TABLE timeline_entries ADD COLUMN description_en TEXT;
