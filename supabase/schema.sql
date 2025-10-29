-- Field Nodes Database Schema
-- Production-ready schema with security and performance optimizations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (length(username) >= 3 AND length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- Fields (research areas)
CREATE TABLE public.fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.users(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9_]+$')
);

-- Node types and statuses
CREATE TYPE node_type AS ENUM ('raw', 'context', 'support', 'reflection');
CREATE TYPE node_status AS ENUM ('draft', 'grounded', 'reviewed', 'canonical', 'needs_revision');

-- Nodes table
CREATE TABLE public.nodes (
  id TEXT PRIMARY KEY,
  type node_type NOT NULL,
  status node_status DEFAULT 'draft',
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.users(id),
  statement TEXT NOT NULL,
  description TEXT,
  sources JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  parent_node_id TEXT REFERENCES public.nodes(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_node_id CHECK (id ~ '^FN-[A-Z]{2}\.[0-9]{3}$'),
  CONSTRAINT statement_not_empty CHECK (length(trim(statement)) > 0)
);

-- Node connections (relationships)
CREATE TYPE relationship_type AS ENUM ('expands', 'supports', 'revises', 'situates', 'verifies', 'challenges');

CREATE TABLE public.node_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  to_node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  relationship_type relationship_type NOT NULL,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT no_self_reference CHECK (from_node_id != to_node_id)
);

-- Field memberships (roles)
CREATE TYPE member_role AS ENUM ('viewer', 'contributor', 'editor', 'steward');

CREATE TABLE public.field_memberships (
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role member_role DEFAULT 'contributor',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (field_id, user_id)
);

-- Activity log (social feed)
CREATE TYPE activity_action AS ENUM ('offered', 'supported', 'reflected', 'linked', 'revised');

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  action activity_action NOT NULL,
  node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_nodes_field_id ON public.nodes(field_id);
CREATE INDEX idx_nodes_author_id ON public.nodes(author_id);
CREATE INDEX idx_nodes_created_at ON public.nodes(created_at DESC);
CREATE INDEX idx_nodes_status ON public.nodes(status);
CREATE INDEX idx_activity_field_created ON public.activity_log(field_id, created_at DESC);
CREATE INDEX idx_connections_from ON public.node_connections(from_node_id);
CREATE INDEX idx_connections_to ON public.node_connections(to_node_id);
CREATE INDEX idx_field_memberships_user ON public.field_memberships(user_id);
CREATE INDEX idx_field_memberships_field ON public.field_memberships(field_id);
CREATE INDEX idx_fields_slug ON public.fields(slug);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Public profiles, own edits
CREATE POLICY "Users can read all profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Fields: Public readable, member writable
CREATE POLICY "Anyone can read public fields" ON public.fields
  FOR SELECT USING (is_public = true);

CREATE POLICY "Members can read private fields" ON public.fields
  FOR SELECT USING (
    id IN (SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create fields" ON public.fields
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Nodes: Field-based access
CREATE POLICY "Read nodes in accessible fields" ON public.nodes
  FOR SELECT USING (
    field_id IN (
      SELECT id FROM public.fields WHERE is_public = true
      UNION
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Create nodes in member fields" ON public.nodes
  FOR INSERT WITH CHECK (
    field_id IN (
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authors update own draft nodes" ON public.nodes
  FOR UPDATE USING (author_id = auth.uid() AND status = 'draft');

-- Activity log: Field-based read
CREATE POLICY "Read activity in accessible fields" ON public.activity_log
  FOR SELECT USING (
    field_id IN (
      SELECT id FROM public.fields WHERE is_public = true
      UNION
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users create activity" ON public.activity_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Node connections: Read with node access
CREATE POLICY "Read connections for accessible nodes" ON public.node_connections
  FOR SELECT USING (
    from_node_id IN (SELECT id FROM public.nodes) OR
    to_node_id IN (SELECT id FROM public.nodes)
  );

-- Field memberships: Self-readable
CREATE POLICY "Users read own memberships" ON public.field_memberships
  FOR SELECT USING (user_id = auth.uid());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nodes_updated_at
  BEFORE UPDATE ON public.nodes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Node ID counter function
CREATE SEQUENCE IF NOT EXISTS node_counter_seq;

CREATE OR REPLACE FUNCTION get_next_node_id(node_prefix TEXT)
RETURNS INTEGER AS $$
DECLARE
  next_id INTEGER;
BEGIN
  SELECT nextval('node_counter_seq') INTO next_id;
  RETURN next_id;
END;
$$ LANGUAGE plpgsql;
