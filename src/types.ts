// Represents a row from the CSV
export interface Row {
  module_id: string;
  module_type: string;
  block_order: number;
  image_desktop: string;
  image_mobile: string;
  alt_text: string;
  headline: string;
  subheading: string;
  cta_label: string;
  cta_url: string;
  cta_style: CtaButton;
  overlay_content_align?: OverLayContentPosition;
  design_change_needed?: string;
}

// Represents a block inside a module
export interface Block {
  block_order: number;
  image_desktop: string;
  image_mobile: string;
  alt: string;
  headline?: string;
  subheading?: string;
  cta?: {
    label: string;
    url: string;
    style: CtaButton;
  };
  overlay_content_align?: OverLayContentPosition;
  design_change_needed?: boolean;
}

// Represents a module with multiple blocks
export interface Module {
  id: string;
  type: ModuleType;
  blocks: Block[];
}

export type CtaButton = 'primary' | 'secondary' | 'tertiary';

export type ModuleType = 'hero' | 'promo';

export type OverLayContentPosition = 'left' | 'right' | 'centre';
