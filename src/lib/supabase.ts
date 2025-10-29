import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for API routes) - only available server-side
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
  }
  
  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Database types (generated from Supabase)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      fields: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          created_by: string | null;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          created_by?: string | null;
          is_public?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          created_by?: string | null;
          is_public?: boolean;
          created_at?: string;
        };
      };
      nodes: {
        Row: {
          id: string;
          type: 'raw' | 'context' | 'support' | 'reflection';
          status: 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
          field_id: string;
          author_id: string | null;
          statement: string;
          description: string | null;
          sources: any[];
          metadata: any;
          parent_node_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          type: 'raw' | 'context' | 'support' | 'reflection';
          status?: 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
          field_id: string;
          author_id?: string | null;
          statement: string;
          description?: string | null;
          sources?: any[];
          metadata?: any;
          parent_node_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'raw' | 'context' | 'support' | 'reflection';
          status?: 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
          field_id?: string;
          author_id?: string | null;
          statement?: string;
          description?: string | null;
          sources?: any[];
          metadata?: any;
          parent_node_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      node_connections: {
        Row: {
          id: string;
          from_node_id: string;
          to_node_id: string;
          relationship_type: 'expands' | 'supports' | 'revises' | 'situates' | 'verifies' | 'challenges';
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_node_id: string;
          to_node_id: string;
          relationship_type: 'expands' | 'supports' | 'revises' | 'situates' | 'verifies' | 'challenges';
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_node_id?: string;
          to_node_id?: string;
          relationship_type?: 'expands' | 'supports' | 'revises' | 'situates' | 'verifies' | 'challenges';
          created_by?: string | null;
          created_at?: string;
        };
      };
      field_memberships: {
        Row: {
          field_id: string;
          user_id: string;
          role: 'viewer' | 'contributor' | 'editor' | 'steward';
          joined_at: string;
        };
        Insert: {
          field_id: string;
          user_id: string;
          role?: 'viewer' | 'contributor' | 'editor' | 'steward';
          joined_at?: string;
        };
        Update: {
          field_id?: string;
          user_id?: string;
          role?: 'viewer' | 'contributor' | 'editor' | 'steward';
          joined_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          field_id: string;
          user_id: string | null;
          action: 'offered' | 'supported' | 'reflected' | 'linked' | 'revised';
          node_id: string | null;
          content: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          field_id: string;
          user_id?: string | null;
          action: 'offered' | 'supported' | 'reflected' | 'linked' | 'revised';
          node_id?: string | null;
          content?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          field_id?: string;
          user_id?: string | null;
          action?: 'offered' | 'supported' | 'reflected' | 'linked' | 'revised';
          node_id?: string | null;
          content?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_next_node_id: {
        Args: {
          node_prefix: string;
        };
        Returns: number;
      };
    };
    Enums: {
      node_type: 'raw' | 'context' | 'support' | 'reflection';
      node_status: 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
      relationship_type: 'expands' | 'supports' | 'revises' | 'situates' | 'verifies' | 'challenges';
      member_role: 'viewer' | 'contributor' | 'editor' | 'steward';
      activity_action: 'offered' | 'supported' | 'reflected' | 'linked' | 'revised';
    };
  };
};
