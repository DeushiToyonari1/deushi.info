import { useParams, useSearchParams } from 'react-router-dom';
import { useCategory } from '../hooks/useCategory';
import { usePostsByCategory } from '../hooks/usePostsByCategory';
import { PostListItem } from '../components/PostList/PostListItem';
import { Pagination } from '../components/Pagination';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  const { data: catData, isLoading: catLoading } = useCategory(slug);
  const category = catData?.data?.[0];

  const { data, isLoading, isError } = usePostsByCategory(category?.id, page);

  const setPage = (next: number) => {
    if (next <= 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(next) });
    }
    window.scrollTo({ top: 0 });
  };

  if (catLoading || isLoading) return <p>読み込み中...</p>;
  if (!category) return <NotFoundPage />;
  if (isError) return <p>記事の取得に失敗しました。</p>;
  if (!data) return null;

  return (
    <>
      <h1 className="archive-title">カテゴリー：{category.name}</h1>
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
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </>
  );
}
