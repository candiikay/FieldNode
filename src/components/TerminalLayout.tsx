// Global Terminal Layout Component
// Provides consistent layout and styling for all terminal components

import React from 'react';
import { terminalStyles, globalStyles } from '../styles/terminal';

interface TerminalLayoutProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TerminalLayout({ 
  children, 
  className = '', 
  style = {} 
}: TerminalLayoutProps) {
  return (
    <>
      <style jsx global>{globalStyles}</style>
      <div 
        className={`terminal-container ${className}`}
        style={style}
      >
        <div style={terminalStyles.frameWrap}>
          <div style={terminalStyles.frame}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// Terminal Output Component
interface TerminalOutputProps {
  content: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export function TerminalOutput({ 
  content, 
  className = '', 
  style = {} 
}: TerminalOutputProps) {
  const output = Array.isArray(content) ? content.join('\n') : content;
  
  return (
    <div 
      className={`terminal-output ${className}`}
      style={{
        ...terminalStyles.output,
        ...style
      }}
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}

// Terminal Prompt Component
interface TerminalPromptProps {
  input: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  suggestion?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TerminalPrompt({
  input,
  onChange,
  onKeyDown,
  onKeyPress,
  suggestion = '',
  placeholder = '',
  autoFocus = false,
  className = '',
  style = {}
}: TerminalPromptProps) {
  return (
    <div 
      className={`terminal-prompt ${className}`}
      style={{
        ...terminalStyles.promptRow,
        ...style
      }}
    >
      <span style={{ color: terminalStyles.promptCaret.color }}>&gt;</span>
      <span style={terminalStyles.promptCaret} />
      <div style={terminalStyles.promptInputWrap}>
        <input
          style={{
            ...terminalStyles.promptInput,
            ...style
          }}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {suggestion && (
          <span style={terminalStyles.promptSuggestion}>
            {suggestion.slice(input.length)}
          </span>
        )}
      </div>
    </div>
  );
}

// Terminal Section Buttons Component
interface TerminalSectionButtonsProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  currentSection?: string;
  onSectionClick: (sectionId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TerminalSectionButtons({
  sections,
  currentSection = '',
  onSectionClick,
  className = '',
  style = {}
}: TerminalSectionButtonsProps) {
  return (
    <div 
      className={`terminal-sections ${className}`}
      style={{
        ...terminalStyles.sectionList,
        ...style
      }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          style={
            currentSection === section.id 
              ? terminalStyles.sectionButtonActive 
              : terminalStyles.sectionButton
          }
          onClick={() => onSectionClick(section.id)}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}
