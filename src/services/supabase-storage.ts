import { supabase } from '@/lib/supabase';
import { Node, Field, User, Activity } from '@/types';

export class SupabaseStorage {
  // Node operations
  static async createNode(node: Omit<Node, 'id' | 'created_at' | 'updated_at'>) {
    const nodeId = await this.generateNodeId(node.type);
    
    const { data, error } = await supabase
      .from('nodes')
      .insert({
        id: nodeId,
        ...node,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from('activity_log').insert({
      field_id: node.field_id,
      user_id: node.author_id,
      action: 'offered',
      node_id: nodeId,
    });

    return data;
  }

  static async getNode(id: string) {
    const { data, error } = await supabase
      .from('nodes')
      .select('*, author:users(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getFieldNodes(fieldId: string) {
    const { data, error } = await supabase
      .from('nodes')
      .select('*, author:users(*)')
      .eq('field_id', fieldId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateNode(id: string, updates: Partial<Node>) {
    const { data, error } = await supabase
      .from('nodes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteNode(id: string) {
    const { error } = await supabase
      .from('nodes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Field operations
  static async createField(field: Omit<Field, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('fields')
      .insert(field)
      .select()
      .single();

    if (error) throw error;

    // Auto-join creator
    if (field.created_by) {
      await supabase.from('field_memberships').insert({
        field_id: data.id,
        user_id: field.created_by,
        role: 'steward',
      });
    }

    return data;
  }

  static async getPublicFields() {
    const { data, error } = await supabase
      .from('fields')
      .select('*, created_by:users(*)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getField(slug: string) {
    const { data, error } = await supabase
      .from('fields')
      .select('*, created_by:users(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserFields(userId: string) {
    const { data, error } = await supabase
      .from('field_memberships')
      .select('field:fields(*), role')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(item => ({ ...item.field, role: item.role }));
  }

  // Activity feed
  static async getActivityFeed(fieldId: string, limit = 50) {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*, user:users(*), node:nodes(*)')
      .eq('field_id', fieldId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Node connections
  static async createConnection(
    fromNodeId: string,
    toNodeId: string,
    relationshipType: 'expands' | 'supports' | 'revises' | 'situates' | 'verifies' | 'challenges',
    userId: string
  ) {
    const { data, error } = await supabase
      .from('node_connections')
      .insert({
        from_node_id: fromNodeId,
        to_node_id: toNodeId,
        relationship_type: relationshipType,
        created_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getNodeConnections(nodeId: string) {
    const { data, error } = await supabase
      .from('node_connections')
      .select('*, from_node:nodes(*), to_node:nodes(*)')
      .or(`from_node_id.eq.${nodeId},to_node_id.eq.${nodeId}`);

    if (error) throw error;
    return data;
  }

  // Real-time subscriptions
  static subscribeToField(fieldId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`field:${fieldId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'nodes',
          filter: `field_id=eq.${fieldId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `field_id=eq.${fieldId}`,
        },
        callback
      )
      .subscribe();
  }

  static subscribeToNode(nodeId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`node:${nodeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'nodes',
          filter: `id=eq.${nodeId}`,
        },
        callback
      )
      .subscribe();
  }

  // Node ID generation (using Supabase counter)
  private static async generateNodeId(type: string): Promise<string> {
    const prefix = type === 'raw' ? 'RN' : type === 'context' ? 'CN' : type === 'support' ? 'SN' : 'RF';
    
    // Use Supabase sequence
    const { data, error } = await supabase.rpc('get_next_node_id', {
      node_prefix: prefix,
    });

    if (error) throw error;
    return `FN-${prefix}.${String(data).padStart(3, '0')}`;
  }

  // User operations
  static async createUserProfile(userId: string, username: string, displayName?: string) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        username,
        display_name: displayName,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Field membership operations
  static async joinField(fieldId: string, userId: string, role: 'viewer' | 'contributor' | 'editor' | 'steward' = 'contributor') {
    const { data, error } = await supabase
      .from('field_memberships')
      .insert({
        field_id: fieldId,
        user_id: userId,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async leaveField(fieldId: string, userId: string) {
    const { error } = await supabase
      .from('field_memberships')
      .delete()
      .eq('field_id', fieldId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  static async getFieldMembers(fieldId: string) {
    const { data, error } = await supabase
      .from('field_memberships')
      .select('*, user:users(*)')
      .eq('field_id', fieldId);

    if (error) throw error;
    return data;
  }

  // Search operations
  static async searchNodes(query: string, fieldId?: string) {
    let queryBuilder = supabase
      .from('nodes')
      .select('*, author:users(*)')
      .or(`statement.ilike.%${query}%,description.ilike.%${query}%`);

    if (fieldId) {
      queryBuilder = queryBuilder.eq('field_id', fieldId);
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async searchFields(query: string) {
    const { data, error } = await supabase
      .from('fields')
      .select('*, created_by:users(*)')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
