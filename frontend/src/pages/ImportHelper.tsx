import { useState, useMemo } from 'react';
import { NotFoundPage } from './NotFoundPage';

// ─── 変換ログの型 ──────────────────────────────────────────────
interface TransformStats {
  removedTags: number;
  replacedUrls: number;
  lazyImgs: number;
  extractedFrom: string;
}

// ─── 旧ドメインのパターン ─────────────────────────────────────
const OLD_DOMAINS = [
  'https://deushi.info',
  'http://deushi.info',
  'https://www.deushi.info',
  'http://www.deushi.info',
];

// ─── Web Archive URL のプレフィックスパターン ─────────────────
// 例: https://web.archive.org/web/20231001000000*/https://deushi.info/
const WEB_ARCHIVE_RE = /https?:\/\/web\.archive\.org\/web\/[^/]+\//gi;

/**
 * 貼り付けられた生HTMLを変換してプレビュー用にクレンジングする。
 */
function transformHtml(raw: string): { html: string; stats: TransformStats } {
  const stats: TransformStats = {
    removedTags: 0,
    replacedUrls: 0,
    lazyImgs: 0,
    extractedFrom: 'raw input',
  };

  if (!raw.trim()) return { html: '', stats };

  // DOMParser でパース
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, 'text/html');

  // ① 不要タグを除去
  const REMOVE_SELECTORS = [
    'script',
    'noscript',
    'style',
    'link[rel="stylesheet"]',
    'link[rel="preload"]',
    'link[rel="prefetch"]',
    'meta',
    'iframe',
    'object',
    'embed',
    '.site-header',
    '.site-footer',
    '.sidebar',
    '.widget',
    '.breadcrumb',
    '.navigation',
    '#nav-toggle',
    '#gloval-nav',
    '#page-top',
    'header:not(.post__header)',
    'footer:not(.post__footer)',
    'nav',
  ];
  REMOVE_SELECTORS.forEach((sel) => {
    doc.querySelectorAll(sel).forEach((el) => {
      el.remove();
      stats.removedTags++;
    });
  });

  // ② 記事本文コンテナを抽出（優先順位付き）
  const CONTENT_SELECTORS = [
    '.entry-content',
    '.post-content',
    'article .content',
    'article',
    '.post__section',
    '.articlePost',
    'main',
    'body',
  ];
  let contentEl: Element | null = null;
  let extractedFrom = 'body';
  for (const sel of CONTENT_SELECTORS) {
    const found = doc.querySelector(sel);
    if (found && (found.innerHTML.trim().length > 100)) {
      contentEl = found;
      extractedFrom = sel;
      break;
    }
  }
  stats.extractedFrom = extractedFrom;
  const workingDoc = contentEl ?? doc.body;

  // ③ Web Archive プレフィックスを除去してから旧ドメインURLを相対パスへ
  const processNode = (node: Element) => {
    // href と src 属性を処理
    (['href', 'src', 'data-src', 'srcset'] as const).forEach((attr) => {
      const val = node.getAttribute(attr);
      if (!val) return;

      // Web Archive プレフィックスを除去
      let newVal = val.replace(WEB_ARCHIVE_RE, '');

      // 旧ドメインを除去（相対パスへ）
      OLD_DOMAINS.forEach((domain) => {
        if (newVal.startsWith(domain)) {
          newVal = newVal.slice(domain.length) || '/';
          stats.replacedUrls++;
        }
      });

      if (newVal !== val) {
        node.setAttribute(attr, newVal);
      }
    });

    // style 属性内の URL も処理
    const style = node.getAttribute('style');
    if (style && (style.includes('deushi.info') || style.includes('web.archive.org'))) {
      let newStyle = style.replace(WEB_ARCHIVE_RE, '');
      OLD_DOMAINS.forEach((domain) => {
        newStyle = newStyle.split(domain).join('');
      });
      node.setAttribute('style', newStyle);
      stats.replacedUrls++;
    }
  };

  workingDoc.querySelectorAll('*').forEach(processNode);

  // ④ img タグに loading="lazy" を付与
  workingDoc.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.classList.add('img-fade');
    // 最大幅を制限
    if (!img.style.maxWidth) img.style.maxWidth = '100%';
    stats.lazyImgs++;
  });

  // ⑤ a タグのリンクを現在のブログ構造に合わせて書き換え
  workingDoc.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    // 旧WordPressの記事URLパターンを /posts/:slug 形式へ変換
    // 例: /?p=123 や /archives/123/ → そのまま（slug が不明なのでコメント付与のみ）
    if (href.startsWith('/') || href.startsWith('#')) return;
    // 外部リンクは target="_blank" を付与
    if (href.startsWith('http')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return {
    html: workingDoc.innerHTML,
    stats,
  };
}

// ─── コンポーネント ────────────────────────────────────────────
export function ImportHelper() {
  // 本番環境では 404 として扱う
  if (!import.meta.env.DEV) return <NotFoundPage />;

  return <ImportHelperInner />;
}

function ImportHelperInner() {
  const [rawHtml, setRawHtml] = useState('');
  const [copied, setCopied] = useState(false);

  const { html: previewHtml, stats } = useMemo(
    () => transformHtml(rawHtml),
    [rawHtml],
  );

  const handleClear = () => setRawHtml('');

  const handleCopy = async () => {
    if (!previewHtml) return;
    try {
      await navigator.clipboard.writeText(previewHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API が使えない環境向けフォールバック
      const ta = document.createElement('textarea');
      ta.value = previewHtml;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="import-helper">
      {/* ─── ヘッダー ─── */}
      <div className="import-helper__header">
        <h1 className="import-helper__title">
          <span className="import-helper__badge">DEV ONLY</span>
          Import Helper
        </h1>
        <p className="import-helper__desc">
          Web Archive などからコピーした古い HTML を貼り付けると、現在のブログスタイルでリアルタイムプレビューします。
        </p>
      </div>

      {/* ─── 2カラムレイアウト ─── */}
      <div className="import-helper__body">
        {/* 左ペイン：入力 */}
        <div className="import-helper__pane import-helper__pane--input">
          <div className="import-helper__pane-header">
            <span>📋 HTML を貼り付け</span>
            {rawHtml && (
              <button
                className="import-helper__clear-btn"
                onClick={handleClear}
                type="button"
              >
                クリア
              </button>
            )}
          </div>
          <textarea
            className="import-helper__textarea"
            value={rawHtml}
            onChange={(e) => setRawHtml(e.target.value)}
            placeholder="Web Archive や旧サイトのHTMLをここに貼り付けてください…"
            spellCheck={false}
          />

          {/* 変換ログ */}
          {rawHtml && (
            <div className="import-helper__log">
              <p className="import-helper__log-title">🔄 変換ログ</p>
              <ul className="import-helper__log-list">
                <li>抽出元: <code>{stats.extractedFrom}</code></li>
                <li>除去タグ数: <strong>{stats.removedTags}</strong> か所</li>
                <li>URL 変換数: <strong>{stats.replacedUrls}</strong> か所</li>
                <li>lazy 付与画像: <strong>{stats.lazyImgs}</strong> 枚</li>
              </ul>
            </div>
          )}
        </div>

        {/* 右ペイン：プレビュー */}
        <div className="import-helper__pane import-helper__pane--preview">
          <div className="import-helper__pane-header">
            <span>👁 プレビュー（ブログと同一スタイル）</span>
            <button
              className={`import-helper__copy-btn${copied ? ' import-helper__copy-btn--done' : ''}`}
              onClick={handleCopy}
              disabled={!previewHtml}
              type="button"
            >
              {copied ? '✓ コピー完了！' : '📋 HTMLをコピー'}
            </button>
          </div>
          <div className="import-helper__preview-wrap">
            {previewHtml ? (
              <article className="post">
                <div
                  className="post__section"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </article>
            ) : (
              <p className="import-helper__empty">
                左側にHTMLを貼り付けるとここにプレビューが表示されます
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
