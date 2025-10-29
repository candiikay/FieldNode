import React from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterOutputProps {
  text: string;
  baseSpeed?: number;
  variance?: number;
  showCursor?: boolean;
}

export default function TypewriterOutput({
  text,
  baseSpeed = 80,
  variance = 60,
  showCursor = false
}: TypewriterOutputProps) {
  const output = useTypewriter(text, baseSpeed, variance);

  return (
    <div
      style={{
        fontFamily: 'inherit',
        fontSize: '15px',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6',
        marginBottom: '4px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {output}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '1.2em',
            background: 'var(--field-lilac)',
            marginLeft: '3px',
            borderRadius: '1px',
            boxShadow: '0 0 8px var(--field-lilac)',
            animation: 'blink 1s steps(2, start) infinite',
            verticalAlign: 'bottom',
          }}
        ></span>
      )}
    </div>
  );
}
