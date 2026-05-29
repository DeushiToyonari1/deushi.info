import { Link } from 'react-router-dom';
import { useRecentPosts } from '../../hooks/useRecentPosts';
import { PictureImage } from '../PictureImage';
import { resolveWpUrl } from '../../api/client';

export function RecentPostList() {
  const { data, isLoading, isError } = useRecentPosts();

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>取得に失敗しました。</p>;
  if (!data) return null;

  return (
    <ul className="recent-post-list">
      {data.data.map((post) => {
        const mediaItem = post._embedded?.['wp:featuredmedia']?.[0];
        const rawSrc = mediaItem && 'source_url' in mediaItem ? (mediaItem as { source_url: string }).source_url : null;
        const media = rawSrc ? { source_url: resolveWpUrl(rawSrc), alt_text: (mediaItem as { alt_text?: string }).alt_text ?? '' } : null;
        const dateStr = new Date(post.date).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        return (
          <li key={post.id} className="recent-post-list__item">
            <Link to={`/posts/${post.slug}`} className="recent-post-list__link">
              <div className="recent-post-list__inner">
                <div className="recent-post-list__thumbnail">
                  <PictureImage
                    src={media ? media.source_url : '/images/dummy-post-01.png'}
                    alt={media ? media.alt_text : ''}
                  />
                </div>
                <div className="recent-post-list__body">
                  <div
                    className="recent-post-list__title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div className="recent-post-list__meta">
                    <time className="recent-post-list__date" dateTime={post.date}>{dateStr}</time>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
