// import React from 'react';

// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
//   hover?: boolean;
//   padding?: 'sm' | 'md' | 'lg';
// }

// export const Card: React.FC<CardProps> = ({
//   children,
//   className = '',
//   hover = false,
//   padding = 'md'
// }) => {
//   const paddingClasses = {
//     sm: 'p-4',
//     md: 'p-6',
//     lg: 'p-8'
//   };

//   const baseClasses = 'bg-white border border-gray-200 rounded-xl shadow-sm';
//   const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
//   return (
//     <div className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = ''
// }) => (
//   <div className={`mb-4 ${className}`}>
//     {children}
//   </div>
// );

// export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = ''
// }) => (
//   <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
//     {children}
//   </h3>
// );

// export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = ''
// }) => (
//   <div className={className}>
//     {children}
//   </div>
// );

// src/components/ui/Card.tsx
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>{children}</div>;
export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-6">{children}</div>;
export const CardTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>;
export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-6 pt-0">{children}</div>;
