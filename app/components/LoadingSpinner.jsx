import { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Memuat...', 
  showText = true, 
  className = '',
  fullScreen = false,
  delay = 0
}) => {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!show) return null;

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const spinner = (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''} ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {/* Outer ring */}
          <div className={`${sizeClasses[size]} border-4 border-slate-600 rounded-full animate-pulse`}></div>
          {/* Spinning ring */}
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-cyan-500 border-r-cyan-500 rounded-full animate-spin`}></div>
        </div>
        {showText && (
          <p className={`${textSizeClasses[size]} text-gray-300 font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 flex items-center justify-center">
        <div className="bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-8">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

// Skeleton loader for content placeholders
export const SkeletonLoader = ({ className = '', lines = 3, height = 'h-4' }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-slate-700 rounded ${height} ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
        ></div>
      ))}
    </div>
  );
};

// Card skeleton for product/workshop cards
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 animate-pulse ${className}`}>
      <div className="bg-slate-700 rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-slate-700 rounded h-4 w-3/4"></div>
        <div className="bg-slate-700 rounded h-3 w-1/2"></div>
        <div className="bg-slate-700 rounded h-3 w-2/3"></div>
      </div>
    </div>
  );
};

// Button loading state
export const ButtonLoading = ({ children, isLoading, loadingText = 'Memuat...', ...props }) => {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-transparent border-t-current border-r-current rounded-full animate-spin"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingSpinner;