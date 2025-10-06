import type { Block } from '../../types';
import styles from './PromoGrid.module.scss';
import CTAButton from '../CTAButton/CTAButton';

interface PromoGridProps {
  blocks: Block[];
}

/* NICE TO HAVE: 
   Different font options
*/

export const PromoGrid = ({ blocks }: PromoGridProps) => {
  if (!blocks?.length) return null;
  return (
    <section className={` ${styles.grid}`} aria-label=' Promo blocks'>
      {blocks.map((block, index) => {
        const hasContent = block?.headline || block?.subheading || block?.cta;
        const overlayStyle = `${styles.textOverlay} ${
          styles[block.overlay_content_align ?? 'left']
        }`;
        return (
          <div
            key={`${index}-${block.alt}`}
            className={styles.promoBlock}
            aria-label={`Promo ${index + 1} of ${blocks.length}`}
          >
            <picture>
              <source srcSet={block.image_desktop} media='(min-width: 768px)' />
              <img
                src={block.image_mobile}
                alt={block.alt}
                className={styles.promoImage}
              />
            </picture>
            {hasContent && (
              <div className={overlayStyle}>
                {block.headline && (
                  <h2 className={styles.headline}>{block.headline}</h2>
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
