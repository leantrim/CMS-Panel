import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <span>Produkter</span>
        <span>Ordrar</span>
        <span>Innehåll startsidan</span>
        <span>Sidor</span>
      </div>
      {children}
    </div>
  );
}
