import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { WPPost } from '../../types/post';
import { SEO } from '../SEO';
import { LazyImage } from '../LazyImage';

interface Props {
  post: WPPost;
}

export function PostDetail({ post }: Props) {
  // rest_forbidden エラーの場合 source_url が存在しないため、明示的に確認する
  const mediaItem = post._embedded?.['wp:featuredmedia']?.[0];
  const mediaUrl  = mediaItem && 'source_url' in mediaItem ? mediaItem.source_url as string : null;
  const mediaAlt  = mediaItem && 'alt_text'   in mediaItem ? mediaItem.alt_text   as string : '';
  const categories = post._embedded?.['wp:term']?.[0] ?? [];
  const dateStr = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // excerpt.rendered からHTMLタグを除去してプレーンテキストを取得
  const plainExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();

  // content.rendered 内の <img> タグに loading="lazy" を付与（重複しない）
  const lazyContent = post.content.rendered.replace(
    /<img(?![^>]*\bloading=)([^>]*>)/g,
    '<img loading="lazy"$1',
  );

  // content.rendered 内の img にフェードインクラスを付与（読み込み完了で is-loaded を追加）
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.post__section');
    if (!section) return;

    const imgs = section.querySelectorAll<HTMLImageElement>('img');
    imgs.forEach((img) => {
      img.classList.add('img-fade');
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      }
    });
  }, [post.content.rendered]);

  return (
    <article className="post">
      <SEO title={post.title.rendered} description={plainExcerpt} />
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
        {mediaUrl && (
          <div className="post__thumbnail">
            <LazyImage src={mediaUrl} alt={mediaAlt} />
          </div>
        )}
      </header>

      <div
        className="post__section"
        dangerouslySetInnerHTML={{ __html: lazyContent }}
      />

      <footer className="post__footer">
        <div className="profile-card">
          <div className="profile-card__photo">
            <LazyImage src="/images/image-profile.jpg" alt="プロフィール写真" />
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
