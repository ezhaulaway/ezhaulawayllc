CREATE POLICY "Allow public uploads to quote-photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'quote-photos');