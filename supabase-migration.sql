-- ============================================
-- SUPABASE MIGRATION: PDF Upload & Case Linking
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. Create the procedure_documents linking table
-- This table connects learning_materials (PDFs) to procedures (cases)
CREATE TABLE IF NOT EXISTS procedure_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    procedure_id UUID NOT NULL REFERENCES procedures(id) ON DELETE CASCADE,
    learning_material_id UUID NOT NULL REFERENCES learning_materials(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique links (one PDF can only be linked once to a specific procedure)
    UNIQUE(procedure_id, learning_material_id)
);

-- 2. Add file_size column to learning_materials if it doesn't exist
ALTER TABLE learning_materials 
ADD COLUMN IF NOT EXISTS file_size BIGINT DEFAULT NULL;

-- 3. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_procedure_documents_procedure_id 
ON procedure_documents(procedure_id);

CREATE INDEX IF NOT EXISTS idx_procedure_documents_material_id 
ON procedure_documents(learning_material_id);

CREATE INDEX IF NOT EXISTS idx_learning_materials_user_id 
ON learning_materials(user_id);

CREATE INDEX IF NOT EXISTS idx_learning_materials_file_type 
ON learning_materials(file_type);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE procedure_documents ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for procedure_documents

-- Users can view links for their own procedures
CREATE POLICY "Users can view their procedure document links"
ON procedure_documents
FOR SELECT
USING (
    procedure_id IN (
        SELECT id FROM procedures WHERE user_id = auth.uid()
    )
);

-- Users can create links for their own procedures and materials
CREATE POLICY "Users can create procedure document links"
ON procedure_documents
FOR INSERT
WITH CHECK (
    procedure_id IN (
        SELECT id FROM procedures WHERE user_id = auth.uid()
    )
    AND
    learning_material_id IN (
        SELECT id FROM learning_materials WHERE user_id = auth.uid()
    )
);

-- Users can delete their own links
CREATE POLICY "Users can delete their procedure document links"
ON procedure_documents
FOR DELETE
USING (
    procedure_id IN (
        SELECT id FROM procedures WHERE user_id = auth.uid()
    )
);

-- 6. Create the storage bucket for learning materials (PDFs)
-- Note: Run this separately in the Supabase Dashboard > Storage if it doesn't work via SQL

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'learning-materials',
    'learning-materials',
    true,
    52428800, -- 50MB limit
    ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY['application/pdf']::text[];

-- 7. Storage policies for learning-materials bucket

-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own learning materials"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'learning-materials' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to view their own files
CREATE POLICY "Users can view their own learning materials"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'learning-materials'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete their own learning materials"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'learning-materials'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access (since we're using public URLs)
CREATE POLICY "Public read access for learning materials"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'learning-materials');

-- ============================================
-- IMPORTANT NOTES:
-- ============================================
-- 
-- 1. If the storage bucket creation fails, create it manually:
--    - Go to Supabase Dashboard > Storage
--    - Click "New bucket"
--    - Name: learning-materials
--    - Public bucket: Yes
--    - File size limit: 50MB
--    - Allowed MIME types: application/pdf
--
-- 2. If storage policies fail, create them in Dashboard:
--    - Go to Storage > Policies
--    - Add policies for the learning-materials bucket
--
-- 3. Test the setup:
--    - Upload a PDF through the Library page
--    - Link it to a case
--    - View the PDF in the case detail page
-- ============================================
