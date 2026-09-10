import React from 'react';

interface MutuaMenteLogoProps {
  /** Size variant or custom dimension */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show the text beside or below the symbol */
  showText?: boolean;
  /** Custom class for the symbol icon */
  iconClassName?: string;
  /** Subtitle to show beneath MutuaMente */
  subtitle?: string;
  /** Whether the symbol should be enclosed in the brand circular badge (gold border) */
  withBadge?: boolean;
  /** Color theme mode */
  variant?: 'default' | 'gold' | 'blue' | 'white' | 'dark';
}

/**
 * MutuaMente Symbol SVG (Two interconnected faces/minds representing mutual psychotherapy connection)
 */
export const MutuaMenteSymbol: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color
}) => {
  return (
    <svg
      viewBox="1751 784.8 1498 1430.4"
      fill={color || 'currentColor'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Símbolo MutuaMente"
    >
      <path d="M2521.3,1460l-0.8-1.9c-0.9-2.1-22.1-51.3-71.5-61.6c-39.3-8.2-83.7,10.5-132.1,55.8c-17.2,1.9-88.1,13.2-136.6,71.7   c-37,44.6-51.6,105.2-43.4,180.2c-13.2,25.6-100.6,207.2,35.3,308.5c6.1,24,42.8,147.6,156,170.7c8.9,6.9,43.7,31.8,83.1,31.8   c2.9,0,5.8-0.1,8.8-0.4c23.2-2.3,43.2-13.5,59.6-33.3c8.1-6,37.4-33.9,41.6-126.8c4.5-98.6,0.1-587.7,0-592.6L2521.3,1460z    M2502.8,1747c-11.4-25-23.9-63.3-22.1-108.3c1.2-29.8-1.9-57.3-6.4-80.6c6.3-5.2,17.2-15.1,27.3-28.9   C2501.9,1583.5,2502.5,1664.2,2502.8,1747z M2467.5,2165.2l-2.7,2.3c-13,16.2-28.7,25.2-46.7,27c-23,2.2-45.7-7.6-60.9-16.3   l18.3-4.3l-37.8-8.9l-0.7-0.6l-2.6-0.5c-111.6-21.1-143.1-158-143.4-159.4l-0.8-3.8l-1.2-0.9c-2.6-5.6-5.1-11.4-7.1-17.2   c-1.3-3.7-2.4-7.4-3.1-11.2c-0.5-3.6-1.6-8.2,2.4-9.8c-2.1-0.4-4.2,1.4-5.3,3.4c-1,2-1.7,4.1-2.2,6.2c-1,4.2-1.6,8.4-1.9,12.6   c-0.1,0.7-0.1,1.5-0.1,2.2c-45-40.1-62.5-95.9-51.7-166.4c5.6-36.5,17.7-68.6,26.4-88.2c1.2,2.5,2.3,5.1,3.7,7.5   c5.4,9.7,12.2,18.6,19.9,26.1c-4.9-9.6-8.4-19.6-10.4-29.7c-1-5.1-1.7-10.1-2.1-15.2c-0.3-3.6-0.3-7.4-0.2-10.9l0.5-0.9l-0.4-3.3   c-8.3-70.6,4.6-127.1,38.3-167.8c48.7-58.8,125.5-64.9,126.3-64.9l3.7-0.3l2.6-2.5c38.1-36.2,72.4-54.5,102.3-54.5   c4.8,0,9.5,0.5,14,1.4c34.4,7.1,52.5,40.1,56.3,48c0,3.5,0.1,10.9,0.2,21.6c-6.6,21.9-21.4,39.3-32.1,49.6   c-7.2-27.8-15.5-46.5-17.8-51.3c-0.4-0.9-0.8-1.7-1.2-2.3l-16.7,9.6l-1,0.3c0.3,0.9,6.7,24.4-47.2,123.1   c-3.3,6.1-6.1,12.2-8.8,18.3c-22.4-39.5-67.2-50.7-90.7-50.7h-21.9l14.2,16.7c27.3,32.2,30.9,99.6,31.2,126.3   c-18.4-2-33.5-0.2-34.9-0.1l-7.4,0.9l-1.3,7.4c-6.3,35.7,9.2,73.4,19.8,93.8c-17.8-0.7-29.3,0.6-29.7,0.7l-10,1.3l1.3,10   c12.4,99.5,61.7,156.8,100.7,187.5c-23.9-0.2-40.3,4.8-40.7,5l-10.3,3.4l4,10.1c40,99.6,130.1,111.8,172,111.8c0.8,0,1.4,0,2.1,0   C2470.5,2163,2467.5,2165.1,2467.5,2165.2z M2354.9,1769.2c2.2,31.2,8.2,57.3,13.1,74.4c-20.9-7.6-40.9-11.8-58.2-14   c-5.7-9.4-27.8-48.3-25.2-84.6C2301.4,1744.2,2340.6,1745.4,2354.9,1769.2z M2329.6,1729.3c0-21.9-2-81.8-23.2-123.5   c20.1,5,49.1,18.4,59.4,54l0.6-0.2c-8.6,27.6-12,54.9-12.4,80.3C2346.5,1735,2338.1,1731.6,2329.6,1729.3z M2324.2,2048.9   c28.3-4.6,103.9-6.7,152.9,88C2443.5,2137.5,2363.4,2130.6,2324.2,2048.9z M2501,2053.7c-1.3,28.8-5.1,50.4-9.8,66.7   c-25.3-45.6-56.7-69.7-86.3-81.9l0.1-0.2c-4.7-1.8-113.5-44.9-136.5-190.7c41.3-2.1,192.2,3.7,233,190.3   C2501.4,2043.8,2501.2,2049.2,2501,2053.7z M2502.6,1973.8c-26.8-62.8-68.4-99-109.8-119.6c-6.7-18.9-42.9-131.9,10.4-229.6   c23.4-42.9,36.4-73.3,43.2-94.7c7.8,26.5,15.7,64.9,13.9,108c-3.3,83.1,37,143.4,42.6,151.3   C2503.1,1856.7,2503,1922.7,2502.6,1973.8z" />
    </svg>
  );
};

export const MutuaMenteLogo: React.FC<MutuaMenteLogoProps> = ({
  size = 'md',
  showText = true,
  iconClassName,
  subtitle,
  withBadge = true,
  variant = 'default'
}) => {
  // Dimension mappings
  const dimensions = {
    sm: {
      badge: 'w-8 h-8',
      symbol: 'w-5 h-5',
      title: 'text-lg',
      sub: 'text-[9px]'
    },
    md: {
      badge: 'w-11 h-11',
      symbol: 'w-7 h-7',
      title: 'text-2xl',
      sub: 'text-[11px]'
    },
    lg: {
      badge: 'w-14 h-14',
      symbol: 'w-9 h-9',
      title: 'text-3xl',
      sub: 'text-xs'
    },
    xl: {
      badge: 'w-24 h-24',
      symbol: 'w-16 h-16',
      title: 'text-4xl',
      sub: 'text-sm'
    }
  }[size];

  // Color mappings based on brand identity:
  // Primary Gold: #C9A84C, Gold Dark: #9A7A2E, Blue: #2A6496, Text: #2C2822
  const badgeColors = {
    default: 'bg-white border-2 border-[#E8D5A0] text-[#2A6496] shadow-xs',
    gold: 'bg-[#FDFBF7] border-2 border-[#C9A84C] text-[#C9A84C] shadow-sm',
    blue: 'bg-[#2A6496] border-2 border-[#1A4A72] text-white shadow-sm',
    white: 'bg-white/95 border-2 border-[#E8D5A0] text-[#2A6496] shadow-sm',
    dark: 'bg-[#2C2822] border-2 border-[#C9A84C] text-[#C9A84C] shadow-sm'
  }[variant];

  const titleColors = {
    default: 'text-[#2C2822]',
    gold: 'text-[#9A7A2E]',
    blue: 'text-[#1A4A72]',
    white: 'text-white',
    dark: 'text-[#FDFBF7]'
  }[variant];

  return (
    <div className="flex items-center gap-3">
      {withBadge ? (
        <div
          className={`${dimensions.badge} rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${badgeColors}`}
        >
          <MutuaMenteSymbol className={iconClassName || dimensions.symbol} />
        </div>
      ) : (
        <MutuaMenteSymbol className={iconClassName || dimensions.symbol} />
      )}

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-serif-display ${dimensions.title} font-bold tracking-tight ${titleColors}`}>
              Mutua<span className="text-[#C9A84C]">Mente</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#F5EED8] text-[#9A7A2E] border border-[#E8D5A0] hidden sm:inline-block">
              Psicologia
            </span>
          </div>
          {subtitle && (
            <span className={`font-medium tracking-wide ${dimensions.sub} ${variant === 'white' ? 'text-stone-300' : 'text-[#6B6560]'}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
