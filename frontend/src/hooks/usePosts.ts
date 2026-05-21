import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

export function usePosts(page: number) {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    placeholderData: keepPreviousData,
  });
}
