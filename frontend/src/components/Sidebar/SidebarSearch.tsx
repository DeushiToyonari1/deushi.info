interface Props {
  wpBaseUrl: string;
}

export function SidebarSearch({ wpBaseUrl }: Props) {
  return (
    <div className="sidebar__search">
      <form className="search-form" action={`${wpBaseUrl}/`} method="get" role="search">
        <input
          type="search"
          name="s"
          className="search-form__input"
          placeholder="キーワードで検索"
          aria-label="サイト内検索"
        />
        <button type="submit" className="search-form__button" aria-label="検索" />
      </form>
    </div>
  );
}
