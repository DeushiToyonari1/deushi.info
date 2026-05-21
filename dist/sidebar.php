<aside class="sidebar">
    <div class="sidebar__search">
        <form role="search" method="get" id="searchform" class="search-form" action="<?php echo home_url(); ?>/">
            <input type="search" class="search-form__input" id="s" name="s" value="" placeholder="記事の検索">
            <button type="submit" class="search-form__button" id="searchsubmit"><i class="fa fa-search"></i></button>
        </form>
    </div>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- Googleの広告 -->
    <ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-9473958242696802"
    data-ad-slot="8627815041"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    <div class="sidebar__section sidebar__section--category">
        <h2 class="sidebar__section-title">カテゴリー</h2>
        <ul>
        <?php $categories = get_categories(); ?>
<?php foreach($categories as $category) : ?>
            <li><a href="<?php echo home_url(); ?>/category/<?php echo $category->slug; ?>"><?php echo $category->name; ?>（<?php echo $category->count; ?>）</a></li>
        </li>
<?php endforeach; ?>
        </ul>
    </div>
    <div class="sidebar__section sidebar__section--recent">
        <h2 class="sidebar__section-title">最近の記事</h2>
        <ul class="recent-post-list">
            <?php
            $the_query = new WP_Query(
                array(
                    'post_type' => 'post',
                    'post_status' => 'publish'
                )
            );
            // ループ内のコード
            while ( $the_query->have_posts() ) : $the_query->the_post();
            ?>
            <li class="recent-post-list__item">
                <a href="<?php the_permalink(); ?>" class="recent-post-list__link">
                    <div class="recent-post-list__inner">
                        <div class="recent-post-list__thumbnail">
                            <?php the_post_thumbnail(); ?>
                        </div>
                        <div class="recent-post-list__body">
                            <div class="recent-post-list__title"><?php the_title(); ?></div>
                            <div class="recent-post-list__meta">
                                <time datetime="<?php the_time('Y-m-d'); ?>" class="recent-post-list__date"><?php the_time('Y.m.d'); ?></time>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
<?php endwhile; ?>
        </ul>
    </div>



    <?php
    if (function_exists('wpp_get_mostpopular')) {
        wpp_get_mostpopular(array(
            'limit' => 5, /* list up to 5 posts */
            'range' => 'last7days',
            'order_by' => 'comments'
        ));
    }
    ?>



    <div class="sidebar__section sidebar__section--archive">
        <h2 class="sidebar__section-title">アーカイブ</h2>
        <div class="sidebar__section sidebar__section--category">
            <ul>
                <?php wp_get_archives('type=monthly'); ?>
            </ul>
        </div>
    </div>
    <!-- Googleの広告 -->
    <ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-9473958242696802"
    data-ad-slot="8627815041"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</aside>
