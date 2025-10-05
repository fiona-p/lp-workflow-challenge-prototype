import { HeroBanner } from './HeroBanner/HeroBanner';
import { PromoGrid } from './PromoGrid/PromoGrid';
import type { Module } from '../types';

interface ModuleProps {
  module: Module;
}

const ModuleRenderer = ({ module }: ModuleProps) => {
  switch (module.type) {
    case 'hero':
      return <HeroBanner blocks={module.blocks} />;
    case 'promo':
      return <PromoGrid blocks={module.blocks} />;
    default:
      return null; // Unknown type -> skip rendering
  }
};

export default ModuleRenderer;
