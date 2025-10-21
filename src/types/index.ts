// Field Nodes Type Definitions
// These interfaces define the core data structures for the system

export type UserType = 'guest' | 'account';
export type NodeState = 'evolving' | 'stable' | 'archived';
export type UserRole = 'observer' | 'builder' | 'reflector' | 'steward';
export type Stage = 'origin' | 'orient' | 'covenant' | 'identify' | 'login' | 'lineage' | 'reflect' | 'link' | 'tend' | 'offer' | 'create-node' | 'browse-nodes' | 'node-detail' | 'steward-dashboard';

// Node artifact types for evidence-based content
export type ArtifactType = 'url' | 'video' | 'image' | 'pdf' | 'screenshot';
export type OriginType = 'tiktok' | 'youtube' | 'article' | 'lecture' | 'other';
export type NodeStatus = 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
export type TrustLevel = 'contributor' | 'reviewer' | 'editor';

// System context for understanding node purpose and instructions
export interface NodeSystemContext {
  layer: "raw" | "context" | "reflection";
  description: string;
  instructions: string;
}

// Review metadata for tracking credibility and reviewer information
export interface ReviewMetadata {
  reviewerId?: string;
  reviewerHandle?: string;
  trustLevel?: TrustLevel;
  reviewDate?: string;
  reviewComment?: string;
  nextReviewDate?: string;
}

// Artifact metadata for media attachments
export interface NodeArtifact {
  type: ArtifactType;
  url: string;
  thumbnail?: string;
  metadata?: {
    title?: string;
    author?: string;
    transcript?: string;
    extractedText?: string;
    duration?: number; // for videos
    pageCount?: number; // for PDFs
  };
}

// Origin information for tracking where ideas came from
export interface NodeOrigin {
  type: OriginType;
  description: string; // "feminist systems lecture, 10/2025"
}

// Core Node structure - evidence-based artifacts
export interface Node {
  id: string;                    // e.g., "FN_1.12"
  title: string;                 // user's headline
  thought: string;               // reflection/reaction (markdown)
  origin: NodeOrigin;            // where this came from
  artifacts: NodeArtifact[];     // REQUIRED: at least one evidence
  author: string;                // creator handle
  tags: string[];                // AI-generated + manual tags
  suggestedConnections: string[]; // AI-inferred node IDs
  connections: string[];         // user-confirmed links (reciprocal)
  status: NodeStatus;            // progression through curation
  reviewMetadata?: ReviewMetadata; // reviewer and trust information
  systemContext: NodeSystemContext; // semantic role and instructions
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  lastTended: string;            // ISO date of last maintenance
  connectionCount: number;       // cached count for performance
}

// Enhanced user identity with role-based permissions
export interface UserIdentity {
  name: string;                  // display name
  role: UserRole;                // user's current role
  password?: string;             // for account holders only
  permissions: {
    canCreateNodes: boolean;
    canLinkNodes: boolean;
    canEditMetadata: boolean;
    canArchiveNodes: boolean;
    canTendNodes: boolean;
  };
}

// Field/collection structure
export interface Field {
  id: string;                    // e.g., "system_design"
  name: string;                  // e.g., "System Design"
  description: string;           // field description
  nodeCount: number;             // number of connected nodes
  tags: string[];                // field categories
  color: string;                 // visual identifier
}

// Seed nodes for initial exploration
export interface Seed {
  id: string;                    // node ID
  title: string;                 // node title
  description?: string;          // optional description
}

// Command response types
export interface CommandResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Account creation steps
export type AccountStep = 'name' | 'password' | 'complete';

// Node creation form state
export interface NodeCreationState {
  title: string;
  content: string;
  sources: string[];
  artifacts: NodeArtifact[];
  tags: string[];
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// Search and filter options
export interface SearchOptions {
  query: string;
  field?: string;
  status?: NodeStatus;
  author?: string;
  tags?: string[];
  sortBy: 'recent' | 'connections' | 'title' | 'status';
  sortOrder: 'asc' | 'desc';
}

// Terminal state
export interface TerminalState {
  stage: Stage;
  userIdentity: UserIdentity | null;
  currentNode: Node | null;
  draft: string;
  unlockedSeed: boolean;
  accountStep: AccountStep;
  nodeCreationState?: NodeCreationState;
}
