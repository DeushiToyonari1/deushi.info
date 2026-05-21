import { Link } from 'react-router-dom';

const SITE_NAME = 'ハイパーうしろぐ';

const FOOTER_LINKS = [
  { label: 'ホーム', to: '/' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="site-footer__link">
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
        </div>
        <div className="site-footer__copyright">
          <small>Copyright &copy; {year} {SITE_NAME}. All Rights Reserved.</small>
        </div>
      </footer>
      <p id="page-top">
        <a href="#wrap">PAGE TOP</a>
      </p>
    </>
  );
}
