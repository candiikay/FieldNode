import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Types
interface User {
  isAuthenticated: boolean;
  handle?: string;
}

interface RawNodeForm {
  statement: string;
  description: string;
  sources: string[];
  status: 'draft' | 'grounded' | 'reviewed' | 'canonical' | 'needs_revision';
}

interface RawNodeEditorProps {
  user: User;
  onSeed?: (nodeData: any) => void;
  onCancel?: () => void;
  onSignIn?: () => void;
}

const palette = {
  accent: '#FF3EB5',
  bg: '#0E0E10',
  textPrimary: '#F5EDEE',
  textSecondary: '#9AA0A6',
  divider: '#1C1C1F',
  helpBg: '#141416',
  disabledGradient: 'linear-gradient(135deg, #3a3a3a 0%, #555 100%)',
  guestBannerBg: 'rgba(255,62,181,0.08)',
  guestBannerBorder: '#2A2A2D'
};

const styles = {
  container: {
    background: palette.bg,
    border: '1px solid #222',
    borderRadius: '12px',
    padding: '24px',
    fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    boxSizing: 'border-box' as const
  },
  guestBanner: {
    background: palette.guestBannerBg,
    color: palette.accent,
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: '13px',
    padding: '10px 14px',
    borderBottom: `1px solid ${palette.guestBannerBorder}`,
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'all 0.2s ease'
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: `1px solid ${palette.divider}`,
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: '13px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  },
  headerField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  headerLabel: {
    color: palette.textSecondary,
    fontSize: '11px',
    fontWeight: '500'
  },
  headerValue: {
    color: palette.textPrimary,
    fontSize: '13px',
    fontWeight: '600'
  },
  helpBlock: {
    background: palette.helpBg,
    padding: '18px 20px',
    borderRadius: '10px',
    margin: '16px',
    fontSize: '13px',
    lineHeight: '1.6',
    color: palette.textSecondary
  },
  helpHeader: {
    color: palette.accent,
    fontWeight: '600',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  helpText: {
    margin: '0'
  },
  formSection: {
    padding: '16px'
  },
  fieldGroup: {
    marginBottom: '20px'
  },
  fieldLabel: {
    display: 'block',
    color: palette.textPrimary,
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    background: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: palette.divider,
    borderRadius: '8px',
    padding: '12px 14px',
    color: palette.textPrimary,
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const,
    maxWidth: '100%'
  },
  inputFocused: {
    borderColor: palette.accent,
    boxShadow: `0 0 0 2px rgba(255, 62, 181, 0.1)`
  },
  textInput: {
    resize: 'none' as const
  },
  textarea: {
    minHeight: '80px',
    maxHeight: '120px',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
    maxWidth: '100%'
  },
  sourcesContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  sourceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: palette.helpBg,
    borderRadius: '6px',
    fontSize: '13px'
  },
  sourceText: {
    flex: 1,
    color: palette.textPrimary
  },
  removeSource: {
    background: 'none',
    border: 'none',
    color: palette.textSecondary,
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderTop: `1px solid ${palette.divider}`
  },
  button: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  },
  cancelButton: {
    background: 'transparent',
    color: palette.textSecondary,
    border: `1px solid ${palette.divider}`
  },
  seedButton: {
    background: palette.accent,
    color: 'white',
    border: 'none'
  },
  seedButtonDisabled: {
    background: palette.disabledGradient,
    color: palette.textSecondary,
    cursor: 'not-allowed',
    border: 'none'
  },
  characterCount: {
    fontSize: '12px',
    color: palette.textSecondary,
    textAlign: 'right' as const,
    marginTop: '4px'
  }
};

export default function RawNodeEditor({ 
  user, 
  onSeed, 
  onCancel, 
  onSignIn 
}: RawNodeEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<RawNodeForm>({
    statement: '',
    description: '',
    sources: [],
    status: 'draft'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [newSource, setNewSource] = useState('');
  const statementRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const sourceRef = useRef<HTMLInputElement>(null);

  // Auto-save for guests
  useEffect(() => {
    if (!user.isAuthenticated && (form.statement || form.description || form.sources.length > 0)) {
      localStorage.setItem('rawNodeDraft', JSON.stringify(form));
    }
  }, [form, user.isAuthenticated]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('rawNodeDraft');
    if (savedDraft && !user.isAuthenticated) {
      try {
        const draft = JSON.parse(savedDraft);
        setForm(draft);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, [user.isAuthenticated]);

  const handleInputChange = (field: keyof RawNodeForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSource = () => {
    if (newSource.trim() && !form.sources.includes(newSource.trim())) {
      const newSources = [...form.sources, newSource.trim()];
      const newStatus = user.isAuthenticated && newSources.length > 0 ? 'grounded' : 'draft';
      
      setForm(prev => ({
        ...prev,
        sources: newSources,
        status: newStatus
      }));
      setNewSource('');
    }
  };

  const handleRemoveSource = (index: number) => {
    const newSources = form.sources.filter((_, i) => i !== index);
    const newStatus = newSources.length === 0 ? 'draft' : form.status;
    
    setForm(prev => ({
      ...prev,
      sources: newSources,
      status: newStatus
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  const handleSeed = async () => {
    if (!user.isAuthenticated) {
      onSignIn?.();
      return;
    }

    if (!form.statement.trim()) {
      return;
    }

    setIsSaving(true);
    
    try {
      const nodeData = {
        id: `FM-RN.${Date.now().toString().slice(-3)}`, // Temporary ID
        type: 'RawNode',
        author: user.handle || 'anonymous',
        status: form.status,
        statement: form.statement.trim(),
        description: form.description.trim(),
        sources: form.sources,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviewMetadata: undefined // Will be added by reviewers later
      };

      // Clear local draft
      localStorage.removeItem('rawNodeDraft');
      
      // Call parent handler
      onSeed?.(nodeData);
      
      // Show success feedback
      // Success message is handled by the parent component
      
      // Reset form
      setForm({ statement: '', description: '', sources: [], status: 'draft' });
      
    } catch (error) {
      console.error('Failed to seed node:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ statement: '', description: '', sources: [], status: 'draft' });
    localStorage.removeItem('rawNodeDraft');
    onCancel?.();
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const getStatus = () => {
    return form.status;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft': return '#9AA0A6';
      case 'grounded': return '#4CAF50';
      case 'reviewed': return '#2196F3';
      case 'canonical': return '#FF3EB5';
      case 'needs_revision': return '#FF9800';
      default: return '#9AA0A6';
    }
  };

  return (
    <div style={styles.container}>
      {/* Guest Banner */}
      {!user.isAuthenticated && (
        <div 
          style={styles.guestBanner}
          onClick={onSignIn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,62,181,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = palette.guestBannerBg;
          }}
        >
          ⚠️ You're in guest mode — sign in to seed your notes.
        </div>
      )}

      {/* Header Row */}
      <div style={styles.headerRow}>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Type</div>
          <div style={styles.headerValue}>Raw Node</div>
        </div>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Created</div>
          <div style={styles.headerValue}>{getCurrentDate()}</div>
        </div>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Author</div>
          <div style={styles.headerValue}>{user.handle || 'guest'}</div>
        </div>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Status</div>
          <div style={{...styles.headerValue, color: getStatusColor(form.status)}}>
            {getStatus()}
          </div>
        </div>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Reviewer</div>
          <div style={styles.headerValue}>—</div>
        </div>
        <div style={styles.headerField}>
          <div style={styles.headerLabel}>Trust</div>
          <div style={styles.headerValue}>—</div>
        </div>
      </div>

      {/* Help Block */}
      <div style={styles.helpBlock}>
        <div style={styles.helpHeader}>
          💡 What is a Raw Node?
        </div>
        <p style={styles.helpText}>
          A <strong>Raw Node</strong> is the foundational thought unit in the Field system — a single idea, question, or observation that can connect to others later.
          <br /><br />
          It captures:
          <br />• <strong>What</strong> you observed or thought
          <br />• <strong>Where</strong> it came from (text, source, or context)  
          <br />• <strong>Why</strong> it matters or feels connected
        </p>
      </div>

      {/* Form Section */}
      <div style={styles.formSection}>
        {/* Core Thought */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Core Thought</label>
          <input
            ref={statementRef}
            type="text"
            value={form.statement}
            onChange={(e) => handleInputChange('statement', e.target.value)}
            onFocus={() => setFocusedField('statement')}
            onBlur={() => setFocusedField(null)}
            placeholder="A clear, atomic thought, question, or definition…"
            style={{
              ...styles.input,
              ...styles.textInput,
              ...(focusedField === 'statement' ? styles.inputFocused : {})
            }}
          />
        </div>

        {/* Description */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Description</label>
          <textarea
            ref={descriptionRef}
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            placeholder="Expand briefly — what sparked this thought, and why it matters?"
            style={{
              ...styles.input,
              ...styles.textarea,
              ...(focusedField === 'description' ? styles.inputFocused : {})
            }}
            maxLength={1000}
          />
          <div style={styles.characterCount}>
            {form.description.length}/1000
          </div>
        </div>

        {/* Sources */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Sources</label>
          <div style={styles.sourcesContainer}>
            {form.sources.map((source, index) => (
              <div key={index} style={styles.sourceItem}>
                <span style={styles.sourceText}>{source}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSource(index)}
                  style={styles.removeSource}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              ref={sourceRef}
              type="text"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddSource)}
              onFocus={() => setFocusedField('sources')}
              onBlur={() => setFocusedField(null)}
              placeholder="Add a URL, citation, or artifact that grounds this idea…"
              style={{
                ...styles.input,
                ...styles.textInput,
                ...(focusedField === 'sources' ? styles.inputFocused : {})
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            ...styles.button,
            ...styles.cancelButton
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSeed}
          disabled={isSaving || (!user.isAuthenticated && !form.statement.trim())}
          style={{
            ...styles.button,
            ...(user.isAuthenticated ? styles.seedButton : styles.seedButtonDisabled)
          }}
        >
          {isSaving ? 'Seeding…' : user.isAuthenticated ? 'Seed' : 'Sign in to Seed'}
        </button>
      </div>
    </div>
  );
}
