import { useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { PostDetail } from '../components/PostDetail';
import { NotFoundPage } from './NotFoundPage';

export function PostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = usePost(slug);

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>記事の取得に失敗しました。</p>;

  const post = data?.data?.[0];
  if (!post) return <NotFoundPage />;

  return <PostDetail post={post} />;
}
