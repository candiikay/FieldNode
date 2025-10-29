import { useEffect, useState } from 'react';

export function useTypewriter(text: string, baseSpeed = 60, variance = 40) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;

    // Reset when text changes
    setDisplayedText('');

    const words = text.split(' ');
    let i = 0;

    const typeNext = () => {
      if (i < words.length) {
        setDisplayedText((prev) =>
          prev ? `${prev} ${words[i]}` : words[i]
        );
        i++;
        const delay = baseSpeed + Math.random() * variance; // small natural jitter
        setTimeout(typeNext, delay);
      }
    };

    typeNext();
  }, [text, baseSpeed, variance]);

  return displayedText;
}
