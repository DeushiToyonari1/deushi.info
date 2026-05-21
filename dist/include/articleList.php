<div class="post-list">
    <?php
    // ループ内のコード
    while ( have_posts() ) : the_post();
    // NEWアイコン表示
    $days = 5;
    $today = date_i18n('U');
    $entry_day = get_the_time('U');
    $keika = date('U',($today - $entry_day)) / 86400;
    if ( $days > $keika ){
        $newText = "NEW";
        $newClass = "post-list__status";
    }
    else {
        $newText = "";
        $newClass = "";
    }
?>
                <article class="post-list__item">
                    <a href="<?php the_permalink(); ?>">
                        <div class="post-list__media">
                            <?php the_post_thumbnail(); ?>
                        </div>
                    </a>
                    <div class="post-list__content">
                        <div class="post-list__meta">
                            <time datetime="<?php the_time('Y-m-d'); ?>" class="post-list__date"><?php the_time('Y.m.d'); ?></time>
                            <div class="post-list__category">
                                <?php the_category(' ') ?>
                            </div>
                        </div>
                        <h2 class="post-list__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    </div>
                    <div class="post-list__footer">
                        <a href="<?php the_permalink(); ?>"><span class="<?php echo $newClass; ?>"><?php echo $newText; ?></span></a>
                    </div>
                </article>
    <?php endwhile; ?>
            </div>
            <?php if( function_exists("the_pagination") ) the_pagination(); ?>
