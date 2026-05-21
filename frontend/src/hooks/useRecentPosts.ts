import { useQuery } from '@tanstack/react-query';
import { getRecentPosts } from '../api/posts';

export function useRecentPosts() {
  return useQuery({
    queryKey: ['recentPosts'],
    queryFn: getRecentPosts,
  });
}
