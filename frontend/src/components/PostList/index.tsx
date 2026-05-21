import { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { PostListItem } from './PostListItem';
import { Pagination } from '../Pagination';

export function PostList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePosts(page);

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>記事の取得に失敗しました。</p>;
  if (!data) return null;

  return (
    <>
      <ul className="post-list">
        {data.data.map((post) => (
          <li key={post.id}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </>
  );
}
