// Field Nodes Storage Service
// Local-first storage using localStorage with JSON serialization

import { Node, Field, UserIdentity, SearchOptions, NodeStatus } from '../types';

const STORAGE_KEYS = {
  NODES: 'fieldnodes_nodes',
  FIELDS: 'fieldnodes_fields',
  USERS: 'fieldnodes_users',
  SETTINGS: 'fieldnodes_settings',
  NODE_COUNTERS: 'fieldnodes_node_counters',
} as const;

// Node type taxonomy for the Field system
export type NodeType = 'RN' | 'CN' | 'SN' | 'RF' | 'SY';

export const NODE_TYPE_INFO = {
  RN: { name: 'Raw Node', description: 'Foundational thought / observation (atomic)' },
  CN: { name: 'Context Node', description: 'Expands or annotates a raw node' },
  SN: { name: 'Support Node', description: 'External materials (citations, links, evidence)' },
  RF: { name: 'Reflection Node', description: 'Reflective or meta-analysis note' },
  SY: { name: 'System Node', description: 'Internal structure (rules, templates, system definitions)' },
} as const;

interface NodeCounter {
  type: NodeType;
  current_count: number;
}

export class NodeStorage {
  // Node management
  static saveNode(node: Node): void {
    try {
      const nodes = this.getAllNodes();
      const existingIndex = nodes.findIndex(n => n.id === node.id);
      
      if (existingIndex >= 0) {
        nodes[existingIndex] = { ...node, updatedAt: new Date().toISOString() };
      } else {
        nodes.push({ ...node, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }
      
      localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));
    } catch (error) {
      console.error('Failed to save node:', error);
      throw new Error('Failed to save node to storage');
    }
  }

  static getNode(id: string): Node | null {
    try {
      const nodes = this.getAllNodes();
      return nodes.find(n => n.id === id) || null;
    } catch (error) {
      console.error('Failed to get node:', error);
      return null;
    }
  }

  static getAllNodes(): Node[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NODES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get nodes:', error);
      return [];
    }
  }

  static getNodesByField(fieldId: string): Node[] {
    const nodes = this.getAllNodes();
    return nodes.filter(node => 
      node.tags.some(tag => tag.toLowerCase().includes(fieldId.toLowerCase())) ||
      node.origin.description.toLowerCase().includes(fieldId.toLowerCase())
    );
  }

  static getNodesByStatus(status: NodeStatus): Node[] {
    const nodes = this.getAllNodes();
    return nodes.filter(node => node.status === status);
  }

  static getNodesByAuthor(author: string): Node[] {
    const nodes = this.getAllNodes();
    return nodes.filter(node => node.author === author);
  }

  static searchNodes(query: string): Node[] {
    const nodes = this.getAllNodes();
    const searchTerm = query.toLowerCase();
    
    return nodes.filter(node => 
      node.title.toLowerCase().includes(searchTerm) ||
      node.thought.toLowerCase().includes(searchTerm) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      node.author.toLowerCase().includes(searchTerm) ||
      node.origin.description.toLowerCase().includes(searchTerm) ||
      node.artifacts.some(artifact => 
        artifact.metadata?.title?.toLowerCase().includes(searchTerm) ||
        artifact.metadata?.author?.toLowerCase().includes(searchTerm) ||
        artifact.metadata?.extractedText?.toLowerCase().includes(searchTerm)
      )
    );
  }

  static updateNode(id: string, updates: Partial<Node>): void {
    try {
      const nodes = this.getAllNodes();
      const nodeIndex = nodes.findIndex(n => n.id === id);
      
      if (nodeIndex >= 0) {
        nodes[nodeIndex] = { 
          ...nodes[nodeIndex], 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };
        localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));
      }
    } catch (error) {
      console.error('Failed to update node:', error);
      throw new Error('Failed to update node');
    }
  }

  static deleteNode(id: string): void {
    try {
      const nodes = this.getAllNodes();
      const filteredNodes = nodes.filter(n => n.id !== id);
      localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(filteredNodes));
    } catch (error) {
      console.error('Failed to delete node:', error);
      throw new Error('Failed to delete node');
    }
  }

  // Field management
  static saveField(field: Field): void {
    try {
      const fields = this.getAllFields();
      const existingIndex = fields.findIndex(f => f.id === field.id);
      
      if (existingIndex >= 0) {
        fields[existingIndex] = field;
      } else {
        fields.push(field);
      }
      
      localStorage.setItem(STORAGE_KEYS.FIELDS, JSON.stringify(fields));
    } catch (error) {
      console.error('Failed to save field:', error);
      throw new Error('Failed to save field');
    }
  }

  static getAllFields(): Field[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FIELDS);
      return stored ? JSON.parse(stored) : this.getDefaultFields();
    } catch (error) {
      console.error('Failed to get fields:', error);
      return this.getDefaultFields();
    }
  }

  static getField(id: string): Field | null {
    const fields = this.getAllFields();
    return fields.find(f => f.id === id) || null;
  }

  // User management
  static saveUser(user: UserIdentity): void {
    try {
      const users = this.getAllUsers();
      const existingIndex = users.findIndex(u => u.name === user.name);
      
      if (existingIndex >= 0) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }
      
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save user:', error);
      throw new Error('Failed to save user');
    }
  }

  static getAllUsers(): UserIdentity[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get users:', error);
      return [];
    }
  }

  static getUser(name: string): UserIdentity | null {
    const users = this.getAllUsers();
    return users.find(u => u.name === name) || null;
  }

  // Advanced search with filters
  static searchNodesAdvanced(options: SearchOptions): Node[] {
    let nodes = this.getAllNodes();

    // Filter by query
    if (options.query) {
      nodes = this.searchNodes(options.query);
    }

    // Filter by field
    if (options.field) {
      nodes = nodes.filter(node => 
        node.tags.some(tag => tag.toLowerCase().includes(options.field!.toLowerCase()))
      );
    }

    // Filter by status
    if (options.status) {
      nodes = nodes.filter(node => node.status === options.status);
    }

    // Filter by author
    if (options.author) {
      nodes = nodes.filter(node => node.author === options.author);
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      nodes = nodes.filter(node => 
        options.tags!.some(tag => node.tags.includes(tag))
      );
    }

    // Sort results
    nodes.sort((a, b) => {
      let comparison = 0;
      
      switch (options.sortBy) {
        case 'recent':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'connections':
          comparison = a.connectionCount - b.connectionCount;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return options.sortOrder === 'desc' ? -comparison : comparison;
    });

    return nodes;
  }

  // Node ID generation system
  static generateNodeId(type: NodeType = 'RN'): string {
    const counters = this.getNodeCounters();
    const counter = counters.find(c => c.type === type) || { type, current_count: -1 };
    const nextCount = counter.current_count + 1;
    
    // Update counter atomically
    this.updateNodeCounter(type, nextCount);
    
    // Format as FN-{type}.{count} with decimal point and zero padding
    return `FN-${type}.${String(nextCount).padStart(3, '0')}`;
  }

  // Reset node counters (for development/testing)
  static resetNodeCounters(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.NODE_COUNTERS);
    } catch (error) {
      console.error('Failed to reset node counters:', error);
    }
  }

  // Sync counters with actual nodes (in case of mismatch)
  static syncCountersWithNodes(): void {
    try {
      const nodes = this.getAllNodes();
      const counters: NodeCounter[] = [];
      
      // Count actual nodes by type
      Object.keys(NODE_TYPE_INFO).forEach(typeKey => {
        const type = typeKey as NodeType;
        const actualCount = nodes.filter(n => this.getNodeTypeFromId(n.id) === type).length;
        counters.push({ type, current_count: actualCount - 1 }); // -1 because we start from 0
      });
      
      localStorage.setItem(STORAGE_KEYS.NODE_COUNTERS, JSON.stringify(counters));
    } catch (error) {
      console.error('Failed to sync counters:', error);
    }
  }

  // Node counter management
  static getNodeCounters(): NodeCounter[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NODE_COUNTERS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get node counters:', error);
      return [];
    }
  }

  private static updateNodeCounter(type: NodeType, count: number): void {
    try {
      const counters = this.getNodeCounters();
      const existingIndex = counters.findIndex(c => c.type === type);
      
      if (existingIndex >= 0) {
        counters[existingIndex].current_count = count;
      } else {
        counters.push({ type, current_count: count });
      }
      
      localStorage.setItem(STORAGE_KEYS.NODE_COUNTERS, JSON.stringify(counters));
    } catch (error) {
      console.error('Failed to update node counter:', error);
      throw new Error('Failed to update node counter');
    }
  }

  // Get node type from ID
  static getNodeTypeFromId(id: string): NodeType | null {
    const match = id.match(/^FN-([A-Z]{2})\.\d+$/);
    return match ? (match[1] as NodeType) : null;
  }

  // Get node statistics by type
  static getNodeStatsByType() {
    const nodes = this.getAllNodes();
    const counters = this.getNodeCounters();
    
    const stats = Object.keys(NODE_TYPE_INFO).reduce((acc, type) => {
      const nodeType = type as NodeType;
      const counter = counters.find(c => c.type === nodeType);
      const actualNodes = nodes.filter(n => this.getNodeTypeFromId(n.id) === nodeType);
      
      acc[nodeType] = {
        name: NODE_TYPE_INFO[nodeType].name,
        description: NODE_TYPE_INFO[nodeType].description,
        totalCreated: counter?.current_count || 0,
        actualCount: actualNodes.length,
        latestId: actualNodes.length > 0 ? actualNodes[actualNodes.length - 1].id : null,
      };
      return acc;
    }, {} as Record<NodeType, any>);
    
    return stats;
  }

  // Get statistics
  static getStats() {
    const nodes = this.getAllNodes();
    const fields = this.getAllFields();
    const users = this.getAllUsers();

    return {
      totalNodes: nodes.length,
      totalFields: fields.length,
      totalUsers: users.length,
      nodesByStatus: {
        draft: nodes.filter(n => n.status === 'draft').length,
        grounded: nodes.filter(n => n.status === 'grounded').length,
        reviewed: nodes.filter(n => n.status === 'reviewed').length,
        canonical: nodes.filter(n => n.status === 'canonical').length,
        needs_revision: nodes.filter(n => n.status === 'needs_revision').length,
      },
      averageConnections: nodes.length > 0 ? 
        nodes.reduce((sum, n) => sum + n.connectionCount, 0) / nodes.length : 0,
    };
  }

  // Default fields for initial setup
  private static getDefaultFields(): Field[] {
    return [
      {
        id: 'system_design',
        name: 'System Design',
        description: 'Designing systems for care and collaboration',
        nodeCount: 14,
        tags: ['systems', 'design', 'collaboration'],
        color: '#8B5CF6',
      },
      {
        id: 'feminist_theory',
        name: 'Feminist Theory',
        description: 'Feminist perspectives on technology and society',
        nodeCount: 22,
        tags: ['feminism', 'theory', 'technology'],
        color: '#EC4899',
      },
      {
        id: 'mutual_aid',
        name: 'Mutual Aid',
        description: 'Community care and mutual support systems',
        nodeCount: 17,
        tags: ['mutual-aid', 'community', 'care'],
        color: '#10B981',
      },
      {
        id: 'archiving',
        name: 'Archiving',
        description: 'Preserving and organizing knowledge',
        nodeCount: 10,
        tags: ['archiving', 'preservation', 'knowledge'],
        color: '#F59E0B',
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure',
        description: 'Building sustainable technical infrastructure',
        nodeCount: 8,
        tags: ['infrastructure', 'sustainability', 'technology'],
        color: '#3B82F6',
      },
    ];
  }

  // Clear all data (for development/testing)
  static clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Clear all data and reset counters
  static clearAllAndReset(): void {
    this.clearAll();
    this.resetNodeCounters();
  }

  // Export data for backup
  static exportData() {
    return {
      nodes: this.getAllNodes(),
      fields: this.getAllFields(),
      users: this.getAllUsers(),
      exportedAt: new Date().toISOString(),
    };
  }

  // Import data from backup
  static importData(data: any): void {
    try {
      if (data.nodes) localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(data.nodes));
      if (data.fields) localStorage.setItem(STORAGE_KEYS.FIELDS, JSON.stringify(data.fields));
      if (data.users) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data.users));
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Failed to import data');
    }
  }
}
