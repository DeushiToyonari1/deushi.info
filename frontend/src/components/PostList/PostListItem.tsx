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
      <Link to={`/posts/${post.slug}`} className="post-list__link">
        <div className="post-list__media">
          {media ? (
            <img src={media.source_url} alt={media.alt_text || post.title.rendered} loading="lazy" />
          ) : (
            <img src="/assets/images/sample-thum.jpg" alt="" loading="lazy" />
          )}
        </div>
        <div className="post-list__content">
          <div className="post-list__meta">
            <time className="post-list__date" dateTime={post.date}>{dateStr}</time>
            {category && (
              <span className="post-list__category">{category.name}</span>
            )}
          </div>
          <h2
            className="post-list__title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="post-list__footer">
            {isNew && <span className="post-list__status">NEW</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
