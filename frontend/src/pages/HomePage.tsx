import { useSearchParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { PostListItem } from '../components/PostList/PostListItem';
import { Pagination } from '../components/Pagination';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const { data, isLoading, isError } = usePosts(page);

  const setPage = (next: number) => {
    if (next <= 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(next) });
    }
    window.scrollTo({ top: 0 });
  };

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>記事の取得に失敗しました。</p>;
  if (!data) return null;

  return (
    <>
      <div className="post-list">
        {data.data.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </>
  );
}
