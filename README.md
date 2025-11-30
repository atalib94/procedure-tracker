# Procedure Tracker - Interventional Radiology Procedure Log

A modern web application for tracking interventional radiology procedures, built with Next.js 14 and Supabase.

## Features

- ✅ **EBIR Compliant** - Track procedures according to EBIR categories
- ✅ **Procedure Logging** - Log procedures with images, notes, and details
- ✅ **Learning Library** - Store and organize medical literature (PDFs)
- ✅ **Analytics Dashboard** - Track your progress (coming soon)
- ✅ **Multi-Environment Support** - Support for different certification bodies
- ✅ **Secure Authentication** - Powered by Supabase Auth
- ✅ **Export Ready** - Export data for certification requirements

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd procedure-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qlkdrzjcvcwkpyeyqwls.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsa2RyempjdmN3a3B5ZXlxd2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDI4MjUsImV4cCI6MjA4MDAxODgyNX0.9IfYBRsP850r-hdImE-4ste-jM2Ua4LzYHBL9uIgAe0
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Supabase Setup

### Storage Bucket for Images

You need to create a storage bucket for procedure images:

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `procedure-images`
4. Set to **Public** bucket
5. Click "Create bucket"

### RLS Policies for Storage

Add these policies to the `procedure-images` bucket:

**Insert Policy:**
```sql
CREATE POLICY "Users can upload their own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'procedure-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

**Select Policy:**
```sql
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'procedure-images');
```

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Step 3: Configure Custom Domain

1. In Vercel project settings → Domains
2. Add: `proceduretracker.com`
3. Follow DNS configuration instructions

## Project Structure

```
procedure-tracker/
├── app/
│   ├── dashboard/           # Main app pages
│   │   ├── procedures/     # Procedure logging
│   │   ├── library/        # Learning materials
│   │   ├── analytics/      # Analytics
│   │   └── settings/       # User settings
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── AuthForm.tsx
│   ├── DashboardNav.tsx
│   ├── ProcedureCard.tsx
│   └── ...
├── lib/                    # Utilities
│   ├── supabase-client.ts  # Client-side Supabase
│   ├── supabase-server.ts  # Server-side Supabase
│   └── database.types.ts   # TypeScript types
└── public/                 # Static files
```

## Database Schema

The app uses the following main tables:

- `profiles` - User profiles
- `environments` - Certification bodies (EBIR, etc.)
- `ebir_categories` - Procedure categories
- `medical_centres` - Hospitals/institutions
- `procedures` - Logged procedures
- `learning_materials` - PDF documents
- `institutions` - For future licensing (planned)

## Features Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Procedure logging
- ✅ EBIR categories
- ✅ Image uploads
- ✅ Learning library

### Phase 2 (Coming Soon)
- 🔄 Advanced analytics
- 🔄 Export to PDF/Excel
- 🔄 Procedure templates
- 🔄 Search and filters

### Phase 3 (Planned)
- 📋 Institution licensing
- 📋 User management for institutions
- 📋 Progress tracking
- 📋 Multi-user collaboration

## Environment Management

The app supports multiple certification environments:

- **EBIR** (European Board of Interventional Radiology) - Default
- Add more environments via the admin panel (coming soon)

## Support

For questions or issues:
- Email: support@proceduretracker.com
- GitHub Issues: [Create an issue](https://github.com/your-username/procedure-tracker/issues)

## License

MIT License - See LICENSE file for details

---

Built with ❤️ for interventional radiologists
