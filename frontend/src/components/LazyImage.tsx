import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * loading="lazy" + フェードイン対応の img ラッパー。
 * 読み込み完了時に .is-loaded クラスを付与する。
 */
export function LazyImage({ src, alt, className = '', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={['img-fade', loaded ? 'is-loaded' : '', className].filter(Boolean).join(' ')}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  );
}
