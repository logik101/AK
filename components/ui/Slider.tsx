import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils.ts';

interface SliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, className }) => {
  const [minVal, maxVal] = value;
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className={cn("relative flex items-center h-12", className)}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          onChange([value, maxVal]);
        }}
        className="thumb thumb--zindex-3"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          onChange([minVal, value]);
        }}
        className="thumb thumb--zindex-4"
      />
      <div className="relative w-full">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-1 top-1/2 -translate-y-1/2" />
        <div ref={range} className="absolute h-1.5 bg-kompa-gold-500 rounded-full z-2 top-1/2 -translate-y-1/2" />
        <div className="absolute text-gray-500 text-xs left-0 -bottom-5">{minVal}</div>
        <div className="absolute text-gray-500 text-xs right-0 -bottom-5">{maxVal}</div>
      </div>
      <style>{`
        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
        }
        .thumb--zindex-3 { z-index: 3; }
        .thumb--zindex-4 { z-index: 4; }
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #D4A017;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
          border-radius: 50%;
          cursor: pointer;
        }
        .thumb::-moz-range-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #D4A017;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export { Slider };