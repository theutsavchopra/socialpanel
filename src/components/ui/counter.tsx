import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function Counter({ end, duration = 2000, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      countRef.current = currentCount;
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count >= 1000000 
        ? `${(count / 1000000).toFixed(1)}M`
        : count >= 1000 
          ? `${(count / 1000).toFixed(1)}K` 
          : count}
      {suffix}
    </span>
  );
}
