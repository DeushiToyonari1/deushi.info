import { apiFetch } from './client';
import type { WPCategory } from '../types/category';

export const getCategories = () =>
  apiFetch<WPCategory[]>('/categories', { per_page: '100', hide_empty: '1' });

export const getCategoryBySlug = (slug: string) =>
  apiFetch<WPCategory[]>('/categories', { slug });
