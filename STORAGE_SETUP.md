# Supabase Storage Setup

## Avatar Uploads

To enable profile picture uploads in the application, you need to create a storage bucket in Supabase.

### Steps to Setup Storage Bucket:

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Create a bucket with:
   - **Name**: `profile-pics` (must be lowercase with hyphens, no spaces!)
   - **Public bucket**: ✅ Checked (so users can see each other's profile pictures)
5. Click **Create bucket**

### Storage Policies (Optional but Recommended)

After creating the bucket, you may want to set up policies for security:

1. Click on the `profile-pics` bucket
2. Go to **Policies** tab
3. Add policies:

**Policy 1: Allow authenticated users to upload**
- Policy name: `Users can upload avatars`
- Allowed operation: `INSERT`
- Policy definition: `auth.uid()::text = (storage.foldername(name))[1]`

**Policy 2: Allow public read access**
- Policy name: `Public can view avatars`
- Allowed operation: `SELECT`
- Policy definition: `true`

**Policy 3: Allow users to update their own avatars**
- Policy name: `Users can update their avatars`
- Allowed operation: `UPDATE`
- Policy definition: `auth.uid()::text = (storage.foldername(name))[1]`

**Policy 4: Allow users to delete their own avatars**
- Policy name: `Users can delete their avatars`
- Allowed operation: `DELETE`
- Policy definition: `auth.uid()::text = (storage.foldername(name))[1]`

### Quick Start (Simplified)

Since your bucket is **Public**, you can skip the policies and start using it right away! The bucket will work for basic uploads.

**To test:**
1. Go to `/profile` in your app
2. Click "Upload Image" to select a profile picture
3. Click "Save Image" to upload
4. The image will be stored in Supabase Storage and the `avatar_url` will be updated in their profile

### Optional: Add Security Policies

If you want to restrict who can upload/delete images, you can add policies later by clicking "New policy" under your bucket. But for now, it should work as-is!

