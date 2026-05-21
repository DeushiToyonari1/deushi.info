<?php
add_theme_support( 'post-thumbnails' );
add_theme_support('menus');

ini_set( 'display_errors', 1 );

$author = "出牛 豊成"; //ALL IN ONE SEOで対応
$keyword_list = "出牛,豊成,出牛 豊成"; //ALL IN ONE SEOで対応
$description = "このサイトは出牛による個人的なサイトです。"; //ALL IN ONE SEOで対応
$SITE_TITLE = "ハイパーうしろぐ"; //wp_bloginfo();
$DOCUMENT_ROOT_URL = "https://".$_SERVER["HTTP_HOST"];
$REQUEST_URL = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]; //用途によりALL IN ONE SEOで対応可能 //the_permalink();
$ROBOTS = "index,follow"; //ALL IN ONE SEO
$fbAppId = "365468850844568";
define("VERSION", "20190311");

/** パンくずリスト*/
function breadcrumb(){
global $post;
$str ='';
if(!is_home()&&!is_admin()){
  $str.= '<nav class="breadCrumb">';
  $str.= '<ol class="breadCrumb__list">';
  $str.= '<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. home_url() .'" itemprop="url"><span itemprop="title">ホーム</span></a></li>';

  if(is_search()){
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">「'. get_search_query() .'」で検索した結果</span></li>';
  } elseif(is_tag()){
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">タグ : '. single_tag_title( '' , false ). '</span></li>';
  } elseif(is_404()){
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">404 Not found</span></li>';
  } elseif(is_date()){

  if(get_query_var('day') != 0){
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. get_year_link(get_query_var('year')). '" itemprop="url"><span itemprop="title">' . get_query_var('year'). '年</span></a></li>';
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. get_month_link(get_query_var('year'), get_query_var('monthnum')). '" itemprop="url"><span itemprop="title">'. get_query_var('monthnum') .'月</span></a>  >  </li>';
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">'. get_query_var('day'). '日</span></li>';
  } elseif(get_query_var('monthnum') != 0){
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="'. get_year_link(get_query_var('year')) .'" itemprop="url"><span itemprop="title">'. get_query_var('year') .'年</span></a></li>';
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">'. get_query_var('monthnum'). '月</span></li>';
  } else {
    $str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">'. get_query_var('year') .'年</span></li>';
  }

} elseif(is_category()) {
$cat = get_queried_object();
if($cat -> parent != 0){
$ancestors = array_reverse(get_ancestors( $cat -> cat_ID, 'category' ));
foreach($ancestors as $ancestor){
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><a href="'. get_category_link($ancestor) .'" itemprop="url"><span itemprop="title">'. get_cat_name($ancestor) .'</span></a></li>';
}
}
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">'. $cat -> name . '</span></li>';
} elseif(is_author()){
$str .='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">投稿者 : '. get_the_author_meta('display_name', get_query_var('author')).'</span></li>';
} elseif(is_page()){
if($post -> post_parent != 0 ){
$ancestors = array_reverse(get_post_ancestors( $post->ID ));
foreach($ancestors as $ancestor){
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><a href="'. get_permalink($ancestor).'" itemprop="url"><span itemprop="title">'. get_the_title($ancestor) .'</span></a></li>';
}
}
$str.= '<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">'. $post -> post_title .'</span></li>';

} elseif(is_attachment()){
if($post -> post_parent != 0 ){
$str.= '<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><a href="'. get_permalink($post -> post_parent).'" itemprop="url"><span itemprop="title">'. get_the_title($post -> post_parent) .'</span></a></li>';
}
$str.= '<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">' . $post -> post_title . '</span></li>';
} elseif(is_single()){
$categories = get_the_category($post->ID);
$cat = $categories[0];
if($cat -> parent != 0){
$ancestors = array_reverse(get_ancestors( $cat -> cat_ID, 'category' ));
foreach($ancestors as $ancestor){
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><a href="'. get_category_link($ancestor).'" itemprop="url"><span itemprop="title">'. get_cat_name($ancestor). '</span></a></li>';
}
}
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><a href="'. get_category_link($cat -> term_id). '" itemprop="url"><span itemprop="title">'. $cat-> cat_name . '</span></a></li>';
$str.= '<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">'. $post -> post_title .'</span></li>';
} else{
$str.='<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" itemprop="url"><span itemprop="title">'. wp_title('', false) .'</span></li>';
}
$str.='</ol>';
}
echo $str;
}

/* ページネイション */
function the_pagination() {
  global $wp_query;
  $bignum = 999999999;
  if ( $wp_query->max_num_pages >= 1 ) {
  echo '<nav class="pagination">';
  echo paginate_links( array(
    'base'         => str_replace( $bignum, '%#%', esc_url( get_pagenum_link($bignum) ) ),
    'format'       => '',
    'current'      => max( 1, get_query_var('paged') ),
    'total'        => $wp_query->max_num_pages,
    'prev_text'    => '&larr;',
    'next_text'    => '&rarr;',
    'type'         => 'list',
    'end_size'     => 3,
    'mid_size'     => 3
  ) );
  echo '</nav>';
  }
}

/* 管理バーを非表示 */
add_filter('show_admin_bar', '__return_false');

/* functions.phpにカスタム投稿の設定を追加する */
function add_custom_post() {
  register_post_type(
    'infopage',
    array(
      'label' => 'お知らせ',
      'public' => true,
      'has_archive' => true,
      'menu_position' => 5,
      'supports' => array(
                      'title',
                      'editor',
                      'thumbnail',
                      'revisions',
                      'excerpt',
                      'custom-fields',
                      )
    )
  );
}
add_action('init', 'add_custom_post');


/* functions.phpにカスタムタクソノミーの設定を追加する */
function add_taxonomy() {
  //お知らせカテゴリ
  register_taxonomy(
  'info-cat',
  'infopage',
  array(
    'label' => 'お知らせカテゴリ',
    'singular_label' => 'お知らせカテゴリ',
    'labels' => array(
      'all_items' => 'お知らせカテゴリ一覧',
      'add_new_item' => 'お知らせカテゴリを追加'
    ),
    'public' => true,
    'show_ui' => true,
    'show_in_nav_menus' => true,
    'hierarchical' => true
    )
  );

  //お知らせタグ
  register_taxonomy(
  'info-tag',
  'infopage',
  array(
    'label' => 'お知らせのタグ',
    'singular_label' => 'お知らせのタグ',
    'labels' => array(
      'add_new_item' => 'お知らせのタグを追加'
    ),
    'public' => true,
    'show_ui' => true,
    'show_in_nav_menus' => true,
    'hierarchical' => false
    )
  );
}
add_action( 'init', 'add_taxonomy' );

add_action('init', function() {
  if (!empty($_GET['test_mail'])) {
      $to = 'zombieship@gmail.com';
      $subject = 'テストメール';
      $body = 'これはテストメールです。';
      $headers = ['From: example@example.com'];

      if (wp_mail($to, $subject, $body, $headers)) {
          echo 'メール送信成功';
      } else {
          echo 'メール送信失敗';
      }
      exit;
  }
});
