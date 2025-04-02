'use client'
import styles from './TextScramble.module.css';
import React, { useState, useEffect, useRef } from 'react';

type TextScrambleProps = {
  words?: string[];              
  pauseDuration?: number;        
  scrambleDuration?: number;     
  charScrambleCount?: number;    
  className?: string;            
  wordDelay?: number;
};

const TextScramble: React.FC<TextScrambleProps> = ({
  words = ["SOLVE.", "COMPETE.", "DOMINATE."],
  pauseDuration = 4000,
  scrambleDuration = 100,
  charScrambleCount = 7,
  wordDelay = 1000
}) => {
  const [displayTexts, setDisplayTexts] = useState<string[]>(words.map(() => ''));
  const intervalRefs = useRef<(ReturnType<typeof setInterval> | null)[]>(words.map(() => null));
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?';
  const animationState = useRef<'revealing' | 'pausing' | 'scrambling'>('revealing');
  const completedWords = useRef<boolean[]>(words.map(() => false));

  const scrambleWord = (wordIndex: number, reveal: boolean) => {
    const word = words[wordIndex];
    const letterIndices = Array(word.length).fill(reveal ? 0 : charScrambleCount);
    
    if (intervalRefs.current[wordIndex]) {
      clearInterval(intervalRefs.current[wordIndex]);
    }
    
    intervalRefs.current[wordIndex] = setInterval(() => {
      let output = '';
      let isDone = true;
      
      for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
          output += ' ';
          continue;
        }
        
        if (reveal) {
          if (letterIndices[i] >= charScrambleCount) {
            output += word[i];
          } else {
            output += letters[Math.floor(Math.random() * letters.length)];
            letterIndices[i]++;
            isDone = false;
          }
        } else {
          if (letterIndices[i] <= 0) {
            if (completedWords.current.every(done => done) && isDone) {
              output += '';  
            } else {
              output += letters[Math.floor(Math.random() * letters.length)];
            }
          } else {
            output += letters[Math.floor(Math.random() * letters.length)];
            letterIndices[i]--;
            isDone = false;
          }
        }
      }
      
      setDisplayTexts(prev => {
        const newTexts = [...prev];
        newTexts[wordIndex] = output;
        return newTexts;
      });

      if (isDone) {
        if (intervalRefs.current[wordIndex]) {
          clearInterval(intervalRefs.current[wordIndex]);
          intervalRefs.current[wordIndex] = null;
        }
        
        completedWords.current[wordIndex] = true;

        if (completedWords.current.every(done => done)) {
          if (animationState.current === 'revealing') {
            animationState.current = 'pausing';
            setTimeout(() => {
              animationState.current = 'scrambling';
              completedWords.current = words.map(() => false);
              for (let i = 0; i < words.length; i++) {
                setTimeout(() => scrambleWord(i, false), i * wordDelay);
              }
            }, pauseDuration);
          } else if (animationState.current === 'scrambling') {
            animationState.current = 'revealing';
            completedWords.current = words.map(() => false);
            for (let i = 0; i < words.length; i++) {
              setTimeout(() => scrambleWord(i, true), i * wordDelay);
            }
          }
        }
      }
    }, scrambleDuration);
  };
  
  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      setTimeout(() => scrambleWord(i, true), i * wordDelay);
    }
    
    return () => {
      intervalRefs.current.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);
  
  return (
    <>
      {displayTexts.map((text, index) => (
        <div key={index} className={`${styles["wrapper-container"]} text-aquamarine`}>
          {text}
        </div>
      ))}
    </>
  );
};

export default TextScramble;