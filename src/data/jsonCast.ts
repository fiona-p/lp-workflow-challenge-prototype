import type { Module } from '../types';

/**
 * casts raw JSON (from CSV-to-JSON conversion) into typed Module[].
 * This is only safe as the data has already been validated elsewhere (e.g. CSV validation).
 */
export const jsonCast = (raw: unknown): Module[] => {
  return (raw as { modules: Module[] }).modules;
};
