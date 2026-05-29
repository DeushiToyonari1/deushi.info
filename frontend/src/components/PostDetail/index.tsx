import { Link } from 'react-router-dom';
import parse, { type HTMLReactParserOptions } from 'html-react-parser';
import type { DOMNode } from 'html-react-parser';
import type { WPPost } from '../../types/post';
import { SEO } from '../SEO';
import { PictureImage } from '../PictureImage';
import { resolveWpUrl } from '../../api/client';

interface Props {
  post: WPPost;
}

/** html-react-parser が渡す内部ノード型（プロパティアクセス用） */
type RawNode = Record<string, unknown>;

/**
 * domNode が <img> タグかを型安全に判定するガード関数。
 * - instanceof は ESM/CJS のモジュールインスタンス不一致で false になるため使わない。
 * - html-react-parser が生成する Element ノードは type === 'tag' を持つ。
 *   この文字列比較のみで判定することで、どの環境でも確実に動作する。
 */
function isImgElement(domNode: DOMNode): domNode is DOMNode & {
  name: string;
  attribs: Record<string, string>;
} {
  const el = domNode as unknown as RawNode;
  return el['type'] === 'tag' && el['name'] === 'img';
}

const contentParseOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (!isImgElement(domNode)) return;

    const {
      src = '',
      alt = '',
      class: className,
      width,
      height,
    } = domNode.attribs;

    if (!src) return;

    return (
      <PictureImage
        src={resolveWpUrl(src)}
        alt={alt}
        className={className}
        width={width  ? Number(width)  : undefined}
        height={height ? Number(height) : undefined}
      />
    );
  },
};

export function PostDetail({ post }: Props) {
  // rest_forbidden エラーの場合 source_url が存在しないため、明示的に確認する
  const mediaItem = post._embedded?.['wp:featuredmedia']?.[0];
  const mediaUrl  = mediaItem && 'source_url' in mediaItem ? resolveWpUrl(mediaItem.source_url) || null : null;
  const mediaAlt  = mediaItem && 'alt_text'   in mediaItem ? String(mediaItem.alt_text ?? '') : '';
  const rawTerm   = post._embedded?.['wp:term']?.[0];
  const categories = Array.isArray(rawTerm) ? rawTerm : [];

  const dateStr = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // excerpt.rendered からHTMLタグを除去してプレーンテキストを取得
  const plainExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();

  // content.rendered を html-react-parser でReactツリーに変換し、
  // img タグを PictureImage（<picture>構造）に置き換える
  const parsedContent = parse(post.content.rendered, contentParseOptions);

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
            <PictureImage src={mediaUrl} alt={mediaAlt} />
          </div>
        )}
      </header>

      {/* html-react-parser が img → PictureImage に置き換えるためそのまま展開 */}
      <div className="post__section">
        {parsedContent}
      </div>

      <footer className="post__footer">
        <div className="profile-card">
          <div className="profile-card__photo">
            <PictureImage src="/images/image-profile.jpg" alt="プロフィール写真" />
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
