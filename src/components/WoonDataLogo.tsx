import React from 'react';

interface WoonDataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
  variant?: 'dark' | 'light'; // dark = for dark backgrounds (white WOON, lime DATA); light = for white backgrounds
}

export const WoonDataLogoIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 40 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      {/* Rounded white squircle tile */}
      <rect 
        x="4" 
        y="4" 
        width="92" 
        height="92" 
        rx="24" 
        fill="#FFFFFF" 
      />

      {/* House outline with chimney on right */}
      {/* Chimney */}
      <path 
        d="M66 42V28H74V48" 
        stroke="#080E1A" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* House body & roof */}
      <path 
        d="M22 47L50 25L78 47V79C78 80.66 76.66 82 75 82H25C23.34 82 22 80.66 22 79V47Z" 
        stroke="#080E1A" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* 4 Data / Chart bars in bright lime green inside house */}
      {/* Bar 1 (left - shortest) */}
      <rect 
        x="28.5" 
        y="62" 
        width="7" 
        height="14" 
        rx="3.5" 
        fill="#C9F31D" 
      />

      {/* Bar 2 (medium) */}
      <rect 
        x="39.5" 
        y="48" 
        width="7" 
        height="28" 
        rx="3.5" 
        fill="#C9F31D" 
      />

      {/* Bar 3 (tallest - peaks into roof) */}
      <rect 
        x="50.5" 
        y="35" 
        width="7.5" 
        height="41" 
        rx="3.75" 
        fill="#C9F31D" 
      />

      {/* Bar 4 (medium-tall) */}
      <rect 
        x="62" 
        y="43" 
        width="7" 
        height="33" 
        rx="3.5" 
        fill="#C9F31D" 
      />
    </svg>
  );
};

export const WoonDataLogo: React.FC<WoonDataLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  onClick,
  variant = 'dark'
}) => {
  const iconSizes = {
    sm: 32,
    md: 42,
    lg: 52,
    xl: 64
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9.5px] sm:text-[10px] tracking-[0.22em]',
    lg: 'text-[11px] sm:text-xs tracking-[0.25em]',
    xl: 'text-xs sm:text-sm tracking-[0.28em]'
  };

  const isDark = variant === 'dark';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Icon */}
      <div className={`transition-transform duration-200 ${onClick ? 'group-hover:scale-105' : ''}`}>
        <WoonDataLogoIcon size={iconSizes[size]} />
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black font-display tracking-tight flex items-center ${titleSizes[size]}`}>
          <span className={isDark ? 'text-white' : 'text-slate-950'}>
            WOON
          </span>
          <span className="text-[#C9F31D]">
            DATA
          </span>
        </div>

        {showSubtitle && (
          <p className={`font-bold uppercase text-slate-400 font-sans mt-1 ${subtitleSizes[size]}`}>
            WONEN • PROJECTEN • INZICHT
          </p>
        )}
      </div>
    </div>
  );
};
