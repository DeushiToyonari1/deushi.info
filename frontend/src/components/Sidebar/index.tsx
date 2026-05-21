import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { SidebarSection } from './SidebarSection';
import { SidebarSearch } from './SidebarSearch';
import { RecentPostList } from './RecentPostList';

const WP_BASE = import.meta.env.VITE_WP_URL as string;

export function Sidebar() {
  const { data: catData } = useCategories();

  return (
    <aside className="sidebar">
      <SidebarSearch wpBaseUrl={WP_BASE} />

      <SidebarSection title="カテゴリー" modifier="category">
        {catData ? (
          <ul>
            {catData.data.map((cat) => (
              <li key={cat.id}>
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </SidebarSection>

      <SidebarSection title="新着記事" modifier="recent">
        <RecentPostList />
      </SidebarSection>
    </aside>
  );
}
