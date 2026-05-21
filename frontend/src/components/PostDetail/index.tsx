import { Link } from 'react-router-dom';
import type { WPPost } from '../../types/post';

interface Props {
  post: WPPost;
}

export function PostDetail({ post }: Props) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0] ?? [];
  const dateStr = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <article className="post-detail">
      <header className="post-detail__header">
        <div className="post-detail__meta">
          <time className="post-detail__date" dateTime={post.date}>{dateStr}</time>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="post-detail__category"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <h1
          className="post-detail__title"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {media && (
          <div className="post-detail__thumbnail">
            <img src={media.source_url} alt={media.alt_text || ''} />
          </div>
        )}
      </header>
      <div
        className="post-detail__content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
