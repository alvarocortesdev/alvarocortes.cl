-- Add rich text description field to timeline entries

ALTER TABLE timeline_entries ADD COLUMN description TEXT;

-- Add index for faster lookups (only if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_timeline_entries_type ON timeline_entries(type);
