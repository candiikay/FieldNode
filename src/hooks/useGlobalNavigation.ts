// Global Navigation Hook
// Centralized command handling and navigation logic

import { useRouter } from 'next/router';
import { useCallback } from 'react';

export interface NavigationCommand {
  command: string;
  description: string;
  handler: () => void;
}

export interface GlobalNavigationOptions {
  onHome?: () => void;
  onBack?: () => void;
  onPrimaryAction?: () => void;
  customCommands?: NavigationCommand[];
}

export function useGlobalNavigation(options: GlobalNavigationOptions = {}) {
  const router = useRouter();
  
  const handleCommand = useCallback((command: string) => {
    // Remove leading slash if present
    const cleanCommand = command.startsWith('/') ? command.slice(1) : command;
    
    switch (cleanCommand) {
      case 'home':
        if (options.onHome) {
          options.onHome();
        } else {
          router.push('/?command=home');
        }
        break;
        
      case 'back':
        if (options.onBack) {
          options.onBack();
        } else {
          router.back();
        }
        break;
        
      case 'browse':
        router.push('/?command=browse');
        break;
        
      case 'orient':
        router.push('/?command=orient');
        break;
        
      case 'node':
        router.push('/?command=node');
        break;
        
      case 'help':
        router.push('/help');
        break;
        
      default:
        // Check custom commands
        const customCommand = options.customCommands?.find(cmd => cmd.command === cleanCommand);
        if (customCommand) {
          customCommand.handler();
        } else {
          console.warn(`Unknown command: ${cleanCommand}`);
        }
    }
  }, [router, options]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Tab key - focus management
    if (e.key === 'Tab') {
      e.preventDefault();
      // Focus next element or trigger primary action
      if (options.onPrimaryAction) {
        options.onPrimaryAction();
      }
      return;
    }
    
    // Escape key - go back
    if (e.key === 'Escape') {
      e.preventDefault();
      if (options.onBack) {
        options.onBack();
      } else {
        router.back();
      }
      return;
    }
    
    // Cmd/Ctrl + Enter - primary action
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (options.onPrimaryAction) {
        options.onPrimaryAction();
      }
      return;
    }
  }, [router, options]);
  
  return {
    handleCommand,
    handleKeyDown,
  };
}

// Common command definitions
export const commonCommands: NavigationCommand[] = [
  {
    command: 'home',
    description: 'Return to home screen',
    handler: () => window.location.href = '/?command=home'
  },
  {
    command: 'browse',
    description: 'Browse existing nodes',
    handler: () => window.location.href = '/?command=browse'
  },
  {
    command: 'orient',
    description: 'Show system introduction',
    handler: () => window.location.href = '/?command=orient'
  },
  {
    command: 'node',
    description: 'Create a new node',
    handler: () => window.location.href = '/?command=node'
  },
  {
    command: 'help',
    description: 'Show help system',
    handler: () => window.location.href = '/help'
  }
];
