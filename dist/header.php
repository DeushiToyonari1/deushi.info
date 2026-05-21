<?php
$author = "出牛 豊成"; //ALL IN ONE SEOで対応
$keyword_list = "出牛,豊成,出牛 豊成"; //ALL IN ONE SEOで対応
$description = "このサイトは出牛による個人的なサイトです。"; //ALL IN ONE SEOで対応
$SITE_TITLE = "ハイパーうしろぐ"; //wp_bloginfo();
$ROBOTS = "index,follow"; //ALL IN ONE SEO
$fbAppId = "365468850844568";
$DOCUMENT_ROOT_URL = "https://".$_SERVER["HTTP_HOST"]."/";
$REQUEST_URL = "https://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]; //用途によりALL IN ONE SEOで対応可能 /
 ?>
<!DOCTYPE html>
<html lang="ja">

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="robots" content="<?php echo $ROBOTS; ?>">
    <meta name="author" content="<?php echo $author; ?>">
    <meta name="keywords" content="<?php echo $keyword_list; ?>">
    <meta name="description" content="<?php echo $description; ?>">
    <title><?php echo get_bloginfo('name'); ?></title>
    <meta property="og:locale:alternate" content="JA_JP">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="stylesheet"
        href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css?v=<?php echo VERSION; ?>" media="all">
    <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap"
        rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/toTop.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137971300-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-137971300-1');
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-9473958242696802",
        enable_page_level_ads: true
    });
    </script>
    <script async custom-element="amp-auto-ads" src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"></script>
    <amp-auto-ads type="adsense" data-ad-client="ca-pub-9473958242696802"></amp-auto-ads>
    <script type="text/javascript">
    (function($) {
        $(function() {
            $('#nav-toggle').on('click', function() {
                $('body').toggleClass('open');
            });
            $('#navigation li').on({
                'mouseenter': function() {
                    var index = $(this).index();
                    $('#nav-bg-wrap .nav-bg').eq(index).addClass('active');

                },
                'mouseleave': function() {
                    var index = $(this).index();
                    $('#nav-bg-wrap .nav-bg').eq(index).removeClass('active');
                }
            });
        });
    })(jQuery);
    </script>
    <?php wp_head(); ?>
</head>

<body>
    <div class="wrapper" id="wrap">
        <header class="site-header">
            <div class="site-header__inner">
                <div class="site-header__title">
                    <a href="<?php echo home_url(); ?>"><span><?php echo get_bloginfo('name'); ?></span></a>
                </div>
                <nav class="site-header__nav">
                    <?php wp_nav_menu('default');  ?>
                </nav>
                <div id="nav-toggle">
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="gloval-nav">
                    <nav>
                        <?php wp_nav_menu('default');  ?>
                    </nav>
                </div>
            </div>
        </header>
