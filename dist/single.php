<?php get_header(); ?>
<div class="container">
    <main class="mainContainer">
        <?php breadcrumb(); ?>
        </nav>
        <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
        <article class="post">
            <header class="post__header">
                <h1 class="post__title"><?php the_title(); ?></h1>
                <div class="post__meta">
                    <time datetime="<?php the_time('Y-m-d'); ?>"
                        class="post__date post__date--write"><?php the_time('Y.m.d'); ?></time>
                    <?php if(get_the_time('Y/m/d') != get_the_modified_date('Y/m/d')):?><time
                        datetime="<?php the_modified_date('Y-m-d') ?>"
                        class="post__date post__date--update"><?php the_modified_date('Y.m.d') ?></time>
                    <?php endif;?>
                </div>
                <p><?php estimated_reading_time(); ?></p>
            </header>
            <?php the_content(); ?>
            <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
            <footer class="post__footer">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- Googleの横長広告 -->
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9473958242696802"
                    data-ad-slot="5530878411" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
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
