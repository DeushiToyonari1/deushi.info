import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPostsByCategory } from '../api/posts';

export function usePostsByCategory(categoryId: number | undefined, page: number) {
  return useQuery({
    queryKey: ['posts', 'category', categoryId, page],
    queryFn: () => getPostsByCategory(categoryId!, page),
    enabled: !!categoryId,
    placeholderData: keepPreviousData,
  });
}
