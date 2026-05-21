<?php
/*
Template Name: Contact Form
*/

// フォーム送信時の処理
$error_messages = []; // エラーメッセージ格納用
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $corp_name = sanitize_text_field($_POST['hojin']);
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone1 = sanitize_text_field($_POST['tel']['data'][0] ?? '');
    $phone2 = sanitize_text_field($_POST['tel']['data'][1] ?? '');
    $phone3 = sanitize_text_field($_POST['tel']['data'][2] ?? '');
    $message = sanitize_textarea_field($_POST['inquiry']);

    if (empty($name)) {
        $error_messages[] = 'お名前は必須です。';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_messages[] = '有効なメールアドレスを入力してください。';
    }
    if (empty($message)) {
        $error_messages[] = '問い合わせ内容は必須です。';
    }

    if (empty($error_messages)) {
        $to = 'zombieship@gmail.com';
        $subject = 'お問い合わせフォームより';
        $body = "法人名: $corp_name\n"
              . "お名前: $name\n"
              . "メールアドレス: $email\n"
              . "電話番号: $phone1-$phone2-$phone3\n"
              . "問い合わせ内容:\n$message";
        $headers = "From: no-reply@example.com"; // 送信元メールアドレスを設定
    
        if (wp_mail($to, $subject, $body, $headers)) {
            wp_redirect(add_query_arg('success', 'true', get_permalink()));  // 成功メッセージを表示
            exit;
        } else {
            $error_messages[] = '送信中にエラーが発生しました。';
            error_log('Email failed to send. Debugging wp_mail.'); // ログ出力
            error_log(print_r(compact('to', 'subject', 'body', 'headers'), true)); // 詳細出力
        }
    }
}
?>

<div class="error-messages"></div>

<script>
document.getElementById('contactForm').addEventListener('submit', function(event) {
    let isValid = true;
    let errorMessages = [];

    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const message = document.querySelector('textarea[name="inquiry"]');

    if (name.value.trim() === '') {
        isValid = false;
        errorMessages.push('お名前は必須です。');
    }
    if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        isValid = false;
        errorMessages.push('有効なメールアドレスを入力してください。');
    }
    if (message.value.trim() === '') {
        isValid = false;
        errorMessages.push('問い合わせ内容は必須です。');
    }

    if (!isValid) {
        event.preventDefault();
        const errorDiv = document.querySelector('.error-messages');
        errorDiv.innerHTML = errorMessages.map(msg => `<p style="color: red;">${msg}</p>`).join('');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    let isValid = true;
    let errorMessages = [];

    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const message = document.querySelector('textarea[name="inquiry"]');

    if (name.value.trim() === '') {
        isValid = false;
        errorMessages.push('お名前は必須です。');
    }
    if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        isValid = false;
        errorMessages.push('有効なメールアドレスを入力してください。');
    }
    if (message.value.trim() === '') {
        isValid = false;
        errorMessages.push('問い合わせ内容は必須です。');
    }

    if (!isValid) {
        event.preventDefault();
        const errorDiv = document.querySelector('.error-messages');
        errorDiv.innerHTML = errorMessages.map(msg => `<p style="color: red;">${msg}</p>`).join('');
    } else {
        // フォーム送信後にボタンを無効化
        document.querySelector('input[type="submit"]').disabled = true;

        // エラーメッセージを消去
        document.querySelector('.error-messages').innerHTML = '';
    }
});
</script>
<style>
.error-messages p {
    color: red;
    font-weight: bold;
}
.success-message {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
}
</style>
<?php get_header(); ?>
    <div class="container">
        <main class="mainContainer">
            <?php breadcrumb(); ?>
        </nav>
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <article class="articlePost">
            <header class="articlePost__header">
                <h1 class="articlePost__header-title"><?php the_title(); ?></h1>
                <?php if (!empty($error_messages)): ?>
                    <div class="error-messages">
                        <?php foreach ($error_messages as $error): ?>
                            <p style="color: red;"><?php echo esc_html($error); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                <form method="post" action="" enctype="multipart/form-data" id="contactForm">
                    <div class="form">
                    <div class="formBlockHojin">
                        <div class="formItem">
                            <span class="anyInput">任意</span>法人名
                        </div>
                        <div class="formInput">
                            <div class="inputField">
                                <input type="text" name="hojin" size="60" value="" placeholder="法人名" data-conv-half-alphanumeric="true">
                            </div>
                            <div class="inputFieldExample">例）株式会社●●●●</div>
                        </div>
                    </div>
                    <div class="formBlockName">
                        <div class="formItem">
                            <span class="requiredInput">必須</span>お名前
                        </div>
                        <div class="formInput">
                            <div class="inputField">
                                <input type="text" name="name" required size="60" value="" placeholder="お名前" data-conv-half-alphanumeric="true">
                            </div>
                            <div class="inputFieldExample">例）山田 太郎</div>
                        </div>
                    </div>
                    <div class="formBlockMail">
                        <div class="formItem">
                            <span class="requiredInput">必須</span>MAIL
                        </div>
                        <div class="formInput">
                            <div class="inputField">
                                <input type="email" name="email" required size="60" value="" placeholder="メールアドレス" data-conv-half-alphanumeric="true">
                            </div>
                            <div class="inputFieldExample">例）mail@mail.co.jp</div>
                        </div>
                    </div>
                    <div class="formBlockTel">
                        <div class="formItem">
                            <span class="anyInput">任意</span>電話番号
                        </div>
                        <div class="formInput">
                            <div class="inputField">
                                <span class="mwform-tel-field">
                                    <input type="text" name="tel[data][0]" size="6" maxlength="5" value="" data-conv-half-alphanumeric="true">
                                    -	<input type="text" name="tel[data][1]" size="5" maxlength="4" value="" data-conv-half-alphanumeric="true">
                                    -	<input type="text" name="tel[data][2]" size="5" maxlength="4" value="" data-conv-half-alphanumeric="true">
                                </span>
                                <input type="hidden" name="tel[separator]" value="-">
                            </div>
                            <div class="inputFieldExample">例）03-1234-5678</div>
                        </div>
                    </div>
                    <div class="formBlockInquiry">
                        <div class="formItem">
                            <span class="requiredInput">必須</span>問い合わせ内容
                        </div>
                        <div class="formInput">
                            <div class="inputField">
                                <textarea name="inquiry" required cols="50" rows="5" placeholder="お問い合わせの内容"></textarea>
                            </div>
                            <div class="inputFieldExample">例）お仕事の依頼をしたい</div>
                        </div>
                    </div>
                    <div class="formBlockSend">
                        <input type="submit" name="submitConfirm" value="入力内容を確認する">
                    </div>
                </div>
                <input type="hidden" name="mw-wp-form-form-id" value="221"><input type="hidden" name="mw_wp_form_token" value="2c1a456e5bc71592c8fbd4fff7769db2515ae0fe87619bdce36435bb1f1536d4"></form>
                <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
                <footer class="articlePost__footer">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <!-- Googleの横長広告 -->
                    <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-9473958242696802"
                    data-ad-slot="5530878411"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    <?php include_once("include/profileArea.php"); ?>
                    <?php wp_related_posts() ?>
                    <?php /* comments_template(); */ ?>
                    <?php if ( function_exists( 'echo_crp' ) ) { echo_crp(); } ?>
                    <div class="navigation">
                        <span class="previous-entries"><?php previous_post_link() ?></span>
                        <span class="next-entries"><?php next_post_link() ?></span>
                    </div>
                </footer>
            </article>
            <?php endwhile; ?>
            <?php else : ?>
                <h2>Not Found</h2>
                <p>Sorry, but you are looking for something that isn't here.</p>
                <?php endif; ?>
            </main>
            <?php get_sidebar(); ?>
        </div>
        <?php get_footer(); ?>
    </div>
    <?php wp_footer(); ?>
</body>
</html>
