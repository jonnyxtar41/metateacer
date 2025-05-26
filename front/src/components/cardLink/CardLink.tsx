
import React from 'react';
import styles from './CardLink.module.css';



export interface CardLinkProps {
  title: string;
  description: string;
  linkTo?: string;
  iconUrl?: string;
  iconAltText?: string;
}

const CardLink: React.FC<CardLinkProps> = ({
  title,
  description,
  linkTo,
  iconUrl,
  iconAltText = 'Activity icon', // Default alt text
}) => {
  return (
    <a href={linkTo} className={styles.card}>
      {iconUrl && (
        <img src={iconUrl} alt={iconAltText} className={styles.icon} />
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </a>
  );
};

export default CardLink;