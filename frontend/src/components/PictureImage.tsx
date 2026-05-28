import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;   // オリジナルパス（.jpg / .png）
  alt: string;
}

/** 拡張子を除いたベースパスを返す */
function toBase(src: string): string {
  return src.replace(/\.(jpe?g|png|gif|webp|avif)$/i, '');
}

/**
 * AVIF → WebP → オリジナル の順でブラウザが最適なフォーマットを選ぶ
 * <picture> タグラッパー。loading="lazy" とフェードインを内包する。
 */
export function PictureImage({ src, alt, className = '', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const base = toBase(src);

  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`}  type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={['img-fade', loaded ? 'is-loaded' : '', className]
          .filter(Boolean)
          .join(' ')}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </picture>
  );
}
