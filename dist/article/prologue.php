<?php include_once("../include/config.php"); ?>
<!DOCTYPE html>
<html lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
    <meta meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="robots" content="<?php echo $ROBOTS; ?>">
    <meta name="author" content="<?php echo $author; ?>">
    <meta name="keywords" content="<?php echo $keyword_list; ?>"">
    <meta name="description" content="<?php echo $description; ?>">
    <title>ブログをはじめました。｜<?php echo $SITE_TITLE; ?></title>
    <meta property="og:title" content="ブログをはじめました。">
    <meta property="og:site_name" content="<?php echo $SITE_TITLE; ?>">
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $REQUEST_URL ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/ogp-prologue.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale:alternate" content="JA_JP">
    <meta property="fb:app_id" content="<?php echo $fbAppId; ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@HYPER_USHI">
    <meta name="twitter:creator" content="@HYPER_USHI">
    <meta name="twitter:title" content="<?php echo $SITE_TITLE; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css?v=<?php echo $VERSION; ?>" media="all">
    <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137971300-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-137971300-1');
    </script>
</head>
<body>
<div class="wrapper">
    <?php include_once("../include/siteHeader.php"); ?>
    <div class="container">
        <main class="mainContainer">
            <nav class="breadCrumb">
                <ol class="breadCrumb__list">
                    <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                        <a href="<?php echo get_template_directory_uri(); ?>/" itemprop="url">
                            <span itemprop="title">ホーム</span>
                        </a>
                        <i aria-hidden="true"></i>
                    </li>
                    <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                        <a href="<?php echo get_template_directory_uri(); ?>/" itemprop="url">
                            <span itemprop="title">未分類</span>
                        </a>
                        <i aria-hidden="true"></i>
                    </li>
                    <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                        <a href="<?php echo $REQUEST_URL ?>" itemprop="url">
                            <span itemprop="title">ブログをはじめました。</span>
                        </a>
                    </li>
                </ol>
            </nav>
            <article class="articlePost">
                <header class="articlePost__header">
                    <h1 class="articlePost__header-title">ブログをはじめました。</h1>
                    <div class="articlePost__header-meta">
                        <time datetime="2019-03-29" class="articlePost__date-write">2019.03.29</time>
                    </div>
                    <div class="articlePost__header-media"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/mv-prologue.jpg" alt="メインビジュアル"></div>
                    <div class="articlePost__header-sentence">
                        <p>過去にもブログサイトをやっていたことはありますが、忙しさゆえ、サイトを閉鎖してしまいました。<br>あれから数年、ようやく重たい腰を上げ、新たにブログサイトを立ち上げることとなりました（祝）</p>
                        <p>以前のブログサイトでは技術的なナレッジのみでしたが、これからのブログについては技術的なことのみならず、私生活だったり、私的なメモとして記録を残していきたいと考えています。<br>ニッチな話題を沢山持っているので、誰かの役に立てればとも考えています。</p>
                    </div>
                    <nav class="articlePost__toc">
                        <h2 class="articlePost__toc-title">目次</h2>
                        <ol class="articlePost__toc-list">
                            <li>
                                <a href="#section__1">まずは簡単に自己紹介をしたいと思います。</a>
                                <ol class="articlePost__toc-list">
                                    <li><a href="#section__1_1">一番の趣味はサバゲー！</a></li>
                                    <li><a href="#section__1_2">他にも・・・</a></li>
                                </ol>
                            </li>
                            <li><a href="#section__2">二児の父親をやっています</a></li>
                            <li>
                                <a href="#section__3">重度の難聴</a>
                                <ol class="articlePost__toc-list">
                                    <li><a href="#section__3_1">セカンドオピニオン</a></li>
                                </ol>
                            </li>
                        </ol>
                    </nav>
                </header>
                <section class="articlePost__section">
                    <h2 class="articlePost__section-title" id="section__1">まずは簡単に自己紹介をしたいと思います。</h2>
                    <div class="textPhoto2column">
                        <div class="textPhoto2column__photoLeft">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/image-prologue_01.jpg" alt="出牛">
                        </div>
                        <div class="textPhoto2column__textRight">
                            <p>都内某所にあるWeb制作会社にて、Webディレクターをやっています。<br>過去10年ほどデザイン、コーディング、プログラミング、色々な制作を経て、最終的に今のディレクターという職域に落ち着きました。<br>長い人生という意味では、本当にこれで落ち着いたのかはわかりませんが。</p>
                            <p>元々、制作上がりということもあり、デザイナー、フロントエンドエンジニア、バックエンドエンジニアとある程度の共通言語を持っており、意思の疎通やコミュニケーションなどが問題なく行えるのが強みです。<br>最悪、自らの手を動かすということも可能ですが、なるべくなら避けたいとは思っています。</p>
                        </div>
                    </div>
                    <section class="articlePost__section">
                        <h3 class="articlePost__section-subTitle" id="section__1_1">一番の趣味はサバゲー</h3>
                        <div class="textPhoto2column">
                            <div class="textPhoto2column__photoRight">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/image-prologue_02.jpg" alt="サバゲーをやっている様子">
                            </div>
                            <div class="textPhoto2column__textLeft">
                                <p>色々と多趣味ではありますが、自信を持って言えるのが一番の趣味はサバゲーであるということ。<br>2013年の4月から始めて、早6年が経ちますね。<br>ここまでのめり込める趣味があるのは良いことなのですが、如何せん、お金がかかってしょうがない趣味なんですよね。。。</p>
                                <p>基本的には重装備が好みです。<br>ゲームに勝つよりも、楽しくプレイしたい派です。<br>好きな迷彩はウッドランド、マルチカムブラック、ハイランダー、基本的にはタンカラー系の迷彩が好きですね。</p>
                                <p>少し前までは一ヶ月に1〜2回はサバゲーに行ってましたが、色々と事情があり、半年に一回行けるか行けないかぐらいになってしまい、正直、凹んでいます。。。</p>
                            </div>
                        </div>
                    </section>
                    <section class="articlePost__section">
                        <h3 class="articlePost__section-subTitle" id="section__1_2">他にも・・・</h3>
                        <p>ありきたりではありますが、アニメ、ゲーム、映画、音楽、お酒、だいたいエンタメ系のことは好きです。<br>いつか、キャンプにチャレンジしたいと思っています。</p>
                    </section>
                </section>
                <section class="articlePost__section">
                    <h2 class="articlePost__section-title" id="section__2">二児の父親をやっています</h2>
                    <p>うちには1歳と4ヵ月になる双子の女の子がいます。<br>二卵性の双子なので、姉妹レベルで似てはいますが、親から見ればしっかりと顔の違いがわかりますし、性格にも違いがあるのがわかります。</p>
                    <div class="imageArea isCenter">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/image-prologue_03.jpg" alt="二児の父親">
                    </div>
                </section>
                <section class="articlePost__section">
                    <h2 class="articlePost__section-title" id="section__3">重度の難聴</h2>
                    <p>悲しいことに、長女は両耳ともに重度の難聴です。<br>現在は週一から週二で療育の特別教室に通わせています。<br>耳元で大きな声で話しかければ聞こえるようですが、一番最初にこの事実を知ったときは、丸一ヶ月は夫婦揃って毎日泣きっぱなしでした。<br>今ではその事実を受け入れ、乗り越えられたと思っています。</p>
                    <section class="articlePost__section">
                        <h3 class="articlePost__section-subTitle" id="section__3_1">セカンドオピニオン</h3>
                        <p>また今回とは別の記事で詳細なことを書こうとは思ってますが、長女の難聴に関しては、新生児スクリーニングで発覚し、産院から紹介を受けた病院へ行ったのですが、正直納得のいくような説明も全くなく、ただただ不安を煽られただけでした。<br>どうにか手を尽くせないか、色々と調べてみたところ、東京医療センターの<ruby>加我<rt>かが</rt></ruby><ruby>君孝<rt>きみたか</rt></ruby>先生という小児難聴で世界的に権威のあるお方を発見し、今現在、有り難いことに加我先生に主治医を務めていただいております。</p>
                        <p>生まれてきた子供が難聴ということで、鬱になってしまう親御さんも多いようです。<br>そんな中、不安をさらに煽るような先生もいらっしゃるため、セカンドオピニオンで信頼の出来る先生を見つけることが大事だと学びました。</p>
                    </section>
                </section>
                <footer class="articlePost__footer">
                    <?php include_once("../include/profileArea.php"); ?>
                    <?php
                    /*
                    <aside class="pageNation">
                        <div class="pageNation__prev-active"><a href="<?php echo get_template_directory_uri(); ?>/">前の記事</a></div>
                        <div class="pageNation__next-active"><a href="<?php echo get_template_directory_uri(); ?>/">次の記事</a></div>
                    </aside>
                    */
                    ?>
                </footer>
            </article>
        </main>
        <?php include_once("../include/sideContainer.php"); ?>
    </div>
    <?php include_once("../include/siteFooter.php"); ?>
</div>
</body>
</html>
