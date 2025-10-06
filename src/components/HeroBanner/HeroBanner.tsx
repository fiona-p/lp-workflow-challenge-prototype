import type { Block } from '../../types';
import CTAButton from '../CTAButton/CTAButton';
import styles from './HeroBanner.module.scss';

/* NICE TO HAVE: 
   Different font options
*/

interface HeroBannerProps {
  blocks: Block[];
}

export const HeroBanner = ({ blocks }: HeroBannerProps) => {
  if (!blocks?.length) return null;

  return (
    <section
      className={`sectionWrapper ${styles.hero}`}
      aria-label='Hero Banner'
    >
      {blocks.map((block, index) => {
        const hasContent = block?.headline || block?.subheading || block?.cta;
        const overlayStyle = `${styles.overlay} ${
          styles[block.overlay_content_align ?? 'left']
        }`;
        return (
          <div
            key={`${index}-${block.alt}`}
            className=''
            role='group'
            aria-label={`Hero ${index + 1} of ${blocks.length}`}
          >
            <picture>
              <source srcSet={block.image_desktop} media='(min-width: 768px)' />
              <img
                src={block.image_mobile}
                alt={block.alt}
                className={styles.heroImage}
              />
            </picture>
            {hasContent && (
              <div className={overlayStyle}>
                {block.headline && (
                  <h1 className={styles.headline}>{block.headline}</h1>
                )}
                {block.subheading && (
                  <p className={styles.subheading}>{block.subheading}</p>
                )}
                {block.cta && (
                  <CTAButton
                    label={block.cta.label}
                    url={block.cta.url}
                    {...(block.cta.style && { variant: block.cta.style })}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
