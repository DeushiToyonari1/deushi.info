import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
  });
}
