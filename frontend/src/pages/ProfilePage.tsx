export function ProfilePage() {
  return (
    <article className="articlePost">
      <header className="articlePost__header">
        <h1 className="articlePost__header-title">プロフィール</h1>
      </header>
      <div className="profile-card">
        <div className="profile-card__photo">
          <img src="/images/image-profile.jpg" alt="プロフィール写真" />
        </div>
        <div className="profile-card__body">
          <dl className="profile-card__definition">
            <dt>名前</dt>
            <dd>
              <ruby>出牛<rt>でうし</rt></ruby>{' '}
              <ruby>豊成<rt>とよなり</rt></ruby>
            </dd>
          </dl>
          <dl className="profile-card__definition">
            <dt>生年月日</dt>
            <dd>1983年10月23日</dd>
          </dl>
          <dl className="profile-card__definition">
            <dt>趣味</dt>
            <dd>サバゲー、アニメ、ゲーム、音楽</dd>
          </dl>
          <p>フロントエンドエンジニアをやっています。</p>
          <ul className="profile-card__sns">
            <li className="icon-facebook">
              <a href="https://www.facebook.com/HYPER.USHI" target="_blank" rel="noopener noreferrer" className="link--external">Facebook</a>
            </li>
            <li className="icon-github">
              <a href="https://github.com/ToyonariDeushi" target="_blank" rel="noopener noreferrer" className="link--external">Github</a>
            </li>
            <li className="icon-github">
              <a href="https://github.com/DeushiToyonari1" target="_blank" rel="noopener noreferrer" className="link--external">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
