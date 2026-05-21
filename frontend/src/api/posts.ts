import { apiFetch } from './client';
import type { WPPost } from '../types/post';

export const getPosts = (page = 1, perPage = 10) =>
  apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    per_page: String(perPage),
    page: String(page),
  });

export const getRecentPosts = () =>
  apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    per_page: '5',
    orderby: 'date',
  });

export const getPost = (slug: string) =>
  apiFetch<WPPost[]>('/posts', { slug, _embed: '1' });

export const getPostsByCategory = (categoryId: number, page = 1, perPage = 10) =>
  apiFetch<WPPost[]>('/posts', {
    _embed: '1',
    categories: String(categoryId),
    per_page: String(perPage),
    page: String(page),
  });
