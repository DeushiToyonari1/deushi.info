import { useQuery } from '@tanstack/react-query';
import { getCategoryBySlug } from '../api/categories';

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
