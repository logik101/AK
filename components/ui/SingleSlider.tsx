import React, { useCallback } from 'react';
import { cn } from '../../lib/utils.ts';

interface SingleSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  labels?: string[];
}

const SingleSlider: React.FC<SingleSliderProps> = ({ min, max, step = 1, value, onChange, className, labels }) => {
  
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  }

  const getPercent = useCallback(
    (val: number) => {
      if (max === min) return 0;
      return ((val - min) / (max - min)) * 100;
    },
    [min, max]
  );
  
  const progressPercent = getPercent(value);
  const label = labels && labels[value] ? labels[value] : value;

  return (
    <div className={cn("relative flex items-center h-12 w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleValueChange}
        className="thumb w-full"
        aria-label="Year slider"
      />
      <div className="relative w-full">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-1 top-1/2 -translate-y-1/2" />
        <div 
            className="absolute h-1.5 bg-kompa-gold-500 rounded-full z-2 top-1/2 -translate-y-1/2" 
            style={{ width: `${progressPercent}%`}}
        />
        <div className="absolute text-gray-600 text-xs font-semibold text-center -bottom-5" style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}>
            {label}
        </div>
      </div>
      <style>{`
        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
          z-index: 3;
          margin: 0;
        }
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

export { SingleSlider };
