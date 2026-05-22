import type { WPPost } from '../types/post';
import type { WPCategory } from '../types/category';

export const DUMMY_CATEGORIES: WPCategory[] = [
  { id: 1, name: '育児', slug: 'parenting', count: 1, link: '#' },
  { id: 2, name: 'テクノロジー', slug: 'technology', count: 1, link: '#' },
  { id: 3, name: 'デザイン', slug: 'design', count: 1, link: '#' },
  { id: 4, name: 'ライフスタイル', slug: 'lifestyle', count: 1, link: '#' },
];

export const DUMMY_POSTS: WPPost[] = [
  // ── 実記事 ────────────────────────────────────────────────
  {
    id: 1,
    date: '2025-03-21T00:00:00',
    modified: '2025-03-21T00:00:00',
    slug: 'deaf-school-daughter-sign-language',
    link: '#',
    title: { rendered: '聾学校で学ぶ娘、手話を学べない父――交わる想い' },
    excerpt: {
      rendered: '<p>今年（2025年）の4月で娘たちは小学2年生になります。長女は、もうしばらくの間、東京医療センターに行っておりません。</p>',
    },
    content: {
      rendered:
        '<p>今年（2025年）の4月で娘たちは小学2年生になります。</p>' +
        '<p>長女は、もうしばらくの間、東京医療センターに行っておりません。</p>' +
        '<p>その代わり、今は豪徳寺にあるノーサイドという施設に通ってます。</p>' +
        '<p>でも、加賀先生に出会わなければ、長女は人工内耳になっていたでしょう。</p>' +
        '<p>今も補聴器だけで会話しています。</p>' +
        '<p>長女は聾学校に通ってるのですが、毎日手話を覚えて帰ってきます。</p>' +
        '<p>娘の成長ぶりには驚かされます。</p>' +
        '<p>本来であれば、僕も手話を覚えなければならないのですが、仕事で手一杯になっており、手話の勉強が出来ておりません。</p>',
      protected: false,
    },
    featured_media: 1,
    categories: [1],
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url:
            'https://web.archive.org/web/20251117225104im_/https://www.deushi.info/wp-content/uploads/2019/06/AdobeStock_157518018_Preview.jpg',
          alt_text: '聾学校で学ぶ娘、手話を学べない父――交わる想い',
        },
      ],
      'wp:term': [[DUMMY_CATEGORIES[0]]],
    },
  },
  // ── ダミー記事 ────────────────────────────────────────────
  {
    id: 2,
    date: '2024-12-01T09:00:00',
    modified: '2024-12-01T09:00:00',
    slug: 'scss-bem-tips',
    link: '#',
    title: { rendered: 'SCSSで実現するBEM設計のベストプラクティス' },
    excerpt: {
      rendered:
        '<p>BEM命名規則とSCSSを組み合わせることで、保守性の高いCSS設計が可能になります。実際のプロジェクトで役立つテクニックをご紹介します。</p>',
    },
    content: {
      rendered:
        '<p>BEM（Block Element Modifier）は、CSSクラスの命名規則のひとつです。</p>' +
        '<p>SCSSと組み合わせることで、ネストを使った見やすいコードが書けます。</p>' +
        '<h2>BEMの基本</h2>' +
        '<p>BlockはUIの独立したコンポーネント、ElementはBlockの構成要素、ModifierはBlockやElementのバリエーションを表します。</p>',
      protected: false,
    },
    featured_media: 2,
    categories: [3],
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/images/dummy-post-02.png', alt_text: 'デザインのイメージ' }],
      'wp:term': [[DUMMY_CATEGORIES[2]]],
    },
  },
  {
    id: 3,
    date: '2024-11-15T08:00:00',
    modified: '2024-11-15T08:00:00',
    slug: 'work-life-balance',
    link: '#',
    title: { rendered: 'エンジニアのワークライフバランスを考える' },
    excerpt: {
      rendered:
        '<p>技術の進歩とともに働き方も変化しています。リモートワークやフレックスタイムを活用した、充実した仕事と生活のバランスを探ります。</p>',
    },
    content: {
      rendered:
        '<p>現代のエンジニアにとって、ワークライフバランスは非常に重要なテーマです。</p>' +
        '<p>リモートワークが普及した今、自宅での作業環境を整えることが生産性向上のカギとなっています。</p>' +
        '<h2>リモートワークのコツ</h2>' +
        '<p>適切な休憩、明確な作業時間の設定、そして趣味の時間を大切にすることで、長期的なパフォーマンスを維持できます。</p>',
      protected: false,
    },
    featured_media: 3,
    categories: [4],
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/images/dummy-post-03.png', alt_text: 'ライフスタイルのイメージ' }],
      'wp:term': [[DUMMY_CATEGORIES[3]]],
    },
  },
];
