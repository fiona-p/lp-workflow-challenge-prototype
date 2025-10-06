import styles from './CTAButton.module.scss';
import type { CtaButton } from '../../types';

interface CTAButtonProps {
  label: string;
  url: string;
  variant?: CtaButton;
}

// TODO: A button should be more re-usable eg: link vs external/ children as props / loading / disabled etc
// However for this prototype I will only include the basics
// Note: No need for aria-label as label is always visible

const CTAButton = ({ label, url, variant = 'primary' }: CTAButtonProps) => {
  if (!label) return null;
  const ctaStyles = `btn ${styles.cta} ${styles[variant]}`;

  return (
    <a href={url} className={ctaStyles} aria-label={label}>
      {label}
    </a>
  );
};

export default CTAButton;
