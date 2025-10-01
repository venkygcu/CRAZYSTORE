import React from 'react';
import './SectionCard.css';

const SectionCard = ({ title, description, children }) => (
  <section className="section-card">
    {title && <h2>{title}</h2>}
    {description && <p className="section-card__description">{description}</p>}
    {children}
  </section>
);

export default SectionCard;