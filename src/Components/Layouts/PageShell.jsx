import React from 'react';
import './PageShell.css';

const PageShell = ({ title, subtitle, children, actions }) => (
  <div className="page-shell">
    {(title || subtitle) && (
      <header className="page-header">
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
        {actions && <div className="page-actions">{actions}</div>}
      </header>
    )}
    <div className="page-body">{children}</div>
  </div>
);

export default PageShell;