import { Helmet } from 'react-helmet-async';

const SITE_NAME = '出牛のブログ | deushi.info';
const DEFAULT_DESCRIPTION =
  'フロントエンドエンジニア・出牛豊成のブログ。Web開発・技術・日常について書いています。';

interface Props {
  title?: string;
  description?: string;
}

export function SEO({ title, description }: Props) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={title ? 'article' : 'website'} />
    </Helmet>
  );
}
