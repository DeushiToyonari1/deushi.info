type Modifier = 'category' | 'recent' | 'archive';

interface Props {
  title: string;
  modifier: Modifier;
  children: React.ReactNode;
}

export function SidebarSection({ title, modifier, children }: Props) {
  return (
    <div className={`sidebar__section sidebar__section--${modifier}`}>
      <h2 className="sidebar__section-title">{title}</h2>
      {children}
    </div>
  );
}
