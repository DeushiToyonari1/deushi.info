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
    <article className="post">
      <header className="post__header">
        <h1 className="post__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="post__meta">
          <time className="post__date post__date--write" dateTime={post.date}>{dateStr}</time>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="post__date"
              style={{ marginLeft: '10px', color: '#5b5b5b', textDecoration: 'none', fontSize: '115%' }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        {media && (
          <div className="post__thumbnail">
            <img src={media.source_url} alt={media.alt_text || ''} />
          </div>
        )}
      </header>

      <div
        className="post__section"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <footer className="post__footer">
        <div className="profile-card">
          <div className="profile-card__photo">
            <img src="/images/image-profile.jpg" alt="プロフィール写真" />
          </div>
          <div className="profile-card__body">
            <dl className="profile-card__definition">
              <dt>名前</dt>
              <dd>
                <ruby>出牛<rt>でうし</rt></ruby>{' '}
                <ruby>豊成<rt>とよなり</rt></ruby>
              </dd>
            </dl>
            <p>フロントエンドエンジニアをやっています。</p>
            <ul className="profile-card__sns">
              <li className="icon-facebook">
                <a href="https://www.facebook.com/HYPER.USHI" target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              <li className="icon-github">
                <a href="https://github.com/ToyonariDeushi" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}
