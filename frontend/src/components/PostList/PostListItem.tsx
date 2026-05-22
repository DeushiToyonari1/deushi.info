import { Link } from 'react-router-dom';
import type { WPPost } from '../../types/post';

const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

interface Props {
  post: WPPost;
}

export function PostListItem({ post }: Props) {
  const isNew = Date.now() - new Date(post.date).getTime() < FIVE_DAYS_MS;
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  const dateStr = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <article className="post-list__item">
      <Link to={`/posts/${post.slug}`}>
        <div className="post-list__media">
          {media ? (
            <img src={media.source_url} alt={media.alt_text || post.title.rendered} loading="lazy" />
          ) : (
            <img src="/assets/images/sample-thum.jpg" alt="" loading="lazy" />
          )}
        </div>
      </Link>
      <div className="post-list__content">
        <div className="post-list__meta">
          <time className="post-list__date" dateTime={post.date}>{dateStr}</time>
          {category && (
            <div className="post-list__category">
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </div>
          )}
        </div>
        <h2 className="post-list__title">
          <Link to={`/posts/${post.slug}`}>
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h2>
      </div>
      <div className="post-list__footer">
        <Link to={`/posts/${post.slug}`}>
          {isNew && <span className="post-list__status">NEW</span>}
        </Link>
      </div>
    </article>
  );
}
