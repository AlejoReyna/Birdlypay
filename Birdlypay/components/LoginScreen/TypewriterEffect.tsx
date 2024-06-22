import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, index + 1));
      setIndex(index + 1);
    }, delay);

    if (index === text.length) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [index, text, delay]);

  return (
    <div>
      <h6>{displayText.split('.')[0]}.</h6>
      <h3>{displayText.split('.')[1]}</h3>
    </div>
  );
};

export default TypewriterEffect;