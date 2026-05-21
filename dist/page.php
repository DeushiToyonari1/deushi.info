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
            <?php the_content(); ?>
            <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
            <footer class="post__footer">
                <?php include_once("include/snsArea.php"); ?>
                <?php include_once("include/profileArea.php"); ?>
                <?php /* comments_template(); */ ?>
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
