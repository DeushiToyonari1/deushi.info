import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SITE_NAME = 'ハイパーうしろぐ';

const NAV_ITEMS = [
  { label: 'トップ', to: '/' },
  { label: 'プロフィール', to: '/profile/' },
  { label: 'お問い合わせ', to: '/contact/' },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.classList.toggle('open', isOpen);
    return () => {
      document.body.classList.remove('open');
    };
  }, [isOpen]);

  const navList = (
    <ul>
      {NAV_ITEMS.map(({ label, to }) => (
        <li key={to}>
          <Link to={to}>{label}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__title">
          <Link to="/">
            <span>{SITE_NAME}</span>
          </Link>
        </div>

        <nav className="site-header__nav" aria-label="グローバルナビゲーション">
          {navList}
        </nav>

        <div
          id="nav-toggle"
          role="button"
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isOpen}
          tabIndex={0}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen((prev) => !prev)}
        >
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="gloval-nav" aria-hidden={!isOpen}>
          <nav aria-label="モバイルナビゲーション">{navList}</nav>
        </div>
      </div>
    </header>
  );
}
