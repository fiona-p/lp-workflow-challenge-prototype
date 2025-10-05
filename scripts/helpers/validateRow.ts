import {
  CtaButton,
  ModuleType,
  OverLayContentPosition,
  Row,
} from '../../src/types';

const allowedCtaStyles = ['primary', 'secondary', 'tertiary'] as const;
const allowedModuleTypes = ['hero', 'promo'] as const;
const allowedContentAlignTypes = ['left', 'right', 'centre'] as const;

// TODO: Extend for more scenarios and add test
export function validateRow(row: Row): boolean {
  // Check that required fields exist
  if (!row.module_id || !row.module_type) {
    console.error('Missing module ID or type:', row);
    return false;
  }

  // Check if module type is valid
  if (!allowedModuleTypes.includes(row.module_type as ModuleType)) {
    console.error('Invalid Module Type:', row);
    return false;
  }

  if (!row.image_desktop || !row.image_mobile) {
    console.error('Missing image URLs:', row);
    return false;
  }

  // Simple URL check (must start with / or http)
  const urlRegex = /^(\/|https?:\/\/)/;
  if (!urlRegex.test(row.image_desktop) || !urlRegex.test(row.image_mobile)) {
    console.error('Invalid image URL format:', row);
    return false;
  }

  // If CTA exists, check required fields and style
  if (row.cta_label) {
    if (!row.cta_url) {
      console.error('CTA label exists but CTA URL is missing:', row);
      return false;
    }

    if (!allowedCtaStyles.includes(row.cta_style as CtaButton)) {
      console.error('Invalid overlay position:', row);
      return false;
    }
  }

  // Check if content align is valid
  // undefined is fine, but if it is defined then a type check is needed
  if (
    row.overlay_content_align !== undefined &&
    !allowedContentAlignTypes.includes(
      row.overlay_content_align as OverLayContentPosition
    )
  ) {
    console.error('Invalid Content Align Type:***', row.overlay_content_align);
    return false;
  }

  // All checks passed
  return true;
}
