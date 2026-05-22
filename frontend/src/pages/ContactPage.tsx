import { useState } from 'react';

export function ContactPage() {
  const [form, setForm] = useState({
    hojin: '',
    name: '',
    email: '',
    tel0: '',
    tel1: '',
    tel2: '',
    inquiry: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.name.trim()) errs.push('お名前は必須です。');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.push('有効なメールアドレスを入力してください。');
    if (!form.inquiry.trim()) errs.push('問い合わせ内容は必須です。');
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <article className="articlePost">
        <header className="articlePost__header">
          <h1 className="articlePost__header-title">お問い合わせ</h1>
        </header>
        <div className="mw_wp_form mw_wp_form_complete">
          <div className="thxBox">
            <p>お問い合わせありがとうございました。内容を確認の上、ご連絡いたします。</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="articlePost">
      <header className="articlePost__header">
        <h1 className="articlePost__header-title">お問い合わせ</h1>
      </header>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((msg, i) => (
            <p key={i} style={{ color: 'red', fontWeight: 'bold' }}>{msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} id="contactForm" noValidate>
        <div className="form">
          <div className="formBlockHojin">
            <div className="formItem">
              <span className="anyInput">任意</span>法人名
            </div>
            <div className="formInput">
              <div className="inputField">
                <input
                  type="text"
                  name="hojin"
                  value={form.hojin}
                  onChange={handleChange}
                  placeholder="法人名"
                />
              </div>
              <div className="inputFieldExample">例）株式会社●●●●</div>
            </div>
          </div>

          <div className="formBlockName">
            <div className="formItem">
              <span className="requiredInput">必須</span>お名前
            </div>
            <div className="formInput">
              <div className="inputField">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="お名前"
                  required
                />
              </div>
              <div className="inputFieldExample">例）山田 太郎</div>
            </div>
          </div>

          <div className="formBlockMail">
            <div className="formItem">
              <span className="requiredInput">必須</span>MAIL
            </div>
            <div className="formInput">
              <div className="inputField">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="メールアドレス"
                  required
                />
              </div>
              <div className="inputFieldExample">例）mail@mail.co.jp</div>
            </div>
          </div>

          <div className="formBlockTel">
            <div className="formItem">
              <span className="anyInput">任意</span>電話番号
            </div>
            <div className="formInput">
              <div className="inputField">
                <span className="mwform-tel-field">
                  <input
                    type="text"
                    name="tel0"
                    value={form.tel0}
                    onChange={handleChange}
                    maxLength={5}
                    placeholder="03"
                  />
                  &nbsp;-&nbsp;
                  <input
                    type="text"
                    name="tel1"
                    value={form.tel1}
                    onChange={handleChange}
                    maxLength={4}
                    placeholder="1234"
                  />
                  &nbsp;-&nbsp;
                  <input
                    type="text"
                    name="tel2"
                    value={form.tel2}
                    onChange={handleChange}
                    maxLength={4}
                    placeholder="5678"
                  />
                </span>
              </div>
              <div className="inputFieldExample">例）03-1234-5678</div>
            </div>
          </div>

          <div className="formBlockInquiry">
            <div className="formItem">
              <span className="requiredInput">必須</span>問い合わせ内容
            </div>
            <div className="formInput">
              <div className="inputField">
                <textarea
                  name="inquiry"
                  value={form.inquiry}
                  onChange={handleChange}
                  cols={50}
                  rows={5}
                  placeholder="お問い合わせの内容"
                  required
                />
              </div>
              <div className="inputFieldExample">例）お仕事の依頼をしたい</div>
            </div>
          </div>

          <div className="formBlockSend">
            <input type="submit" value="入力内容を確認する" />
          </div>
        </div>
      </form>
    </article>
  );
}
