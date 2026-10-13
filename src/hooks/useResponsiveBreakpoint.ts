import { useState, useEffect } from 'react';

export type BreakpointMode = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large_desktop';
export type ViewportSimulationMode = 'auto' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large_desktop';

export interface ResponsiveInfo {
  windowWidth: number;
  actualBreakpoint: BreakpointMode;
  effectiveBreakpoint: BreakpointMode;
  simulationMode: ViewportSimulationMode;
  setSimulationMode: (mode: ViewportSimulationMode) => void;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export function getBreakpointFromWidth(width: number): BreakpointMode {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'laptop';
  if (width < 1920) return 'desktop';
  return 'large_desktop';
}

export function useResponsiveBreakpoint(): ResponsiveInfo {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1280;
  });

  const [simulationMode, setSimulationMode] = useState<ViewportSimulationMode>('auto');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const actualBreakpoint = getBreakpointFromWidth(windowWidth);

  // If user selected a simulated mode in the testing bar, map that to the corresponding breakpoint
  const effectiveBreakpoint =
    simulationMode === 'auto'
      ? actualBreakpoint
      : simulationMode;

  return {
    windowWidth,
    actualBreakpoint,
    effectiveBreakpoint,
    simulationMode,
    setSimulationMode,
    isMobile: effectiveBreakpoint === 'mobile',
    isTablet: effectiveBreakpoint === 'tablet',
    isLaptop: effectiveBreakpoint === 'laptop',
    isDesktop: effectiveBreakpoint === 'desktop',
    isLargeDesktop: effectiveBreakpoint === 'large_desktop',
  };
}
