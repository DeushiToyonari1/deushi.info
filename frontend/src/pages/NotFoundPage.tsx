import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">お探しのページは見つかりませんでした。</p>
      <Link to="/" className="not-found__link">トップページへ戻る</Link>
    </div>
  );
}
