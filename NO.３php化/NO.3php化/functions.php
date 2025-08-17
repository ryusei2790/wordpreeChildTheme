<?php
/**
 * nomal functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package nomal
 */



function my_theme_enqueue_assets() {

    // FontAwesome
    wp_enqueue_style(
        'fontawesome',
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        array(),
        '5.1.0'
    );

    // CSSリセット（ress）
    wp_enqueue_style(
        'ress',
        'https://unpkg.com/ress/dist/ress.min.css',
        array(),
        null
    );

    // メインのstyle.css（テーマ直下）
    wp_enqueue_style(
        'main-style',
        get_stylesheet_uri(),
        array('ress') // 依存関係としてressの後に読み込む
    );

    // jQuery（WordPressにはデフォルトのjQueryがあるが、CDN版を使いたい場合は下記）
    wp_deregister_script('jquery'); // 既存の登録を解除
    wp_enqueue_script(
        'jquery',
        'https://code.jquery.com/jquery-3.5.1.min.js',
        array(),
        '3.5.1',
        true
    );

    // GSAP（最新を1つだけ使えばOK）
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        array(),
        '3.12.2',
        true
    );

    // 自作スクリプト（/assets/js/bundle.min.js）
    wp_enqueue_script(
        'bundle',
        get_template_directory_uri() . '/assets/js/bundle.min.js',
        array('jquery', 'gsap'), // 依存関係を指定
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_assets');

<?php
// セットアップ（機能サポート、メニュー登録、HTML5対応など）
function nomal_setup() {
  add_theme_support( 'title-tag' );                // <title> をWPに任せる
  add_theme_support( 'post-thumbnails' );          // アイキャッチ
  add_theme_support( 'html5', [ 'search-form', 'gallery', 'caption', 'comment-form', 'comment-list', 'style', 'script' ] );
  register_nav_menus( [
    'global' => 'グローバルナビ',
    'footer' => 'フッターナビ',
  ] );
  load_theme_textdomain( 'nomal', get_template_directory() . '/languages' ); // 翻訳（任意）
}
add_action( 'after_setup_theme', 'nomal_setup' );

// CSS/JSの読み込み
function nomal_assets() {

  wp_enqueue_script(
    'jquery-cdn',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    [],
    '3.4.1',
    true
  );

  // bxSlider（CSS + JS）
  wp_enqueue_style(
      'bxslider-style',
      'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.15/jquery.bxslider.min.css',
      [],
      '4.2.15'
  );
  wp_enqueue_script(
      'bxslider-js',
      'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.15/jquery.bxslider.min.js',
      ['jquery-cdn'],
      '4.2.15',
      true
  );

  // scrollgress（JS）
  wp_enqueue_script(
      'scrollgress-js',
      'https://cdnjs.cloudflare.com/ajax/libs/scrollgress/2.0.0/scrollgress.min.js',
      [],
      '2.0.0',
      true
  );

  // Google Fonts
  wp_enqueue_style(
      'google-font-lato',
      'https://fonts.googleapis.com/css?family=Lato:900&display=swap',
      [],
      null
  );
  wp_enqueue_style( 'nomal-reset', get_theme_file_uri( '/assets/css/reset.css' ), [], '1.0' );
  wp_enqueue_style( 'nomal-layout', get_theme_file_uri( '/assets/css/layout.css' ), ['nomal-reset'], '1.0' );
  wp_enqueue_style( 'nomal-parts', get_theme_file_uri( '/assets/css/parts.css' ), ['nomal-layout'], '1.0' );
  wp_enqueue_style( 'nomal-style-main', get_theme_file_uri( '/style.css' ), ['nomal-style-rtl'], '1.0' );
  wp_enqueue_script( 'nomal-main', get_theme_file_uri( '/assets/js/script.js' ), ['jquery-cdn', 'bxslider-js', 'scrollgress-js'], '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'nomal_assets' );

function my_service_styles() {
  if( is_singular('service') ) {
      wp_enqueue_style('service-css', get_template_directory_uri() . '/assets/css/service.css');
  }
}
add_action('wp_enqueue_scripts', 'my_service_styles');

function my_vision_styles() {
  if( is_singular('vision') ) {
      wp_enqueue_style('vision-css', get_template_directory_uri() . '/assets/css/vision.css');
  }
}
add_action('wp_enqueue_scripts', 'my_vision_styles');


// ウィジェットエリア（任意：サイドバー）
function nomal_widgets_init() {
  register_sidebar( [
    'name'          => 'サイドバー',
    'id'            => 'sidebar-1',
    'before_widget' => '<section id="%1$s" class="widget %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget-title">',
    'after_title'   => '</h2>',
  ] );
}
add_action( 'widgets_init', 'nomal_widgets_init' );

function aniumaservice_register_post_type() {
  $labels = array(
    'name' => 'サービス',
    'singular_name' => 'サービス',
    'add_new' => '新規追加',
    'add_new_item' => '新しいサービスを追加',
    'edit_item' => 'サービスを編集',
    'new_item' => '新しいサービス',
    'view_item' => 'サービスを表示',
);

$args = array(
  'labels' => $labels,
  'public' => true,
  'has_archive' => false,
  'menu_icon' => 'dashicons-hammer',
  'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
  'show_in_rest' => true, // Gutenberg対応
);

    register_post_type('service', $args);
}
add_action('init', 'aniumaservice_register_post_type');

function aniumaservice_register_taxonomy() {
  $labels = array(
    'name' => 'サービスカテゴリ',
    'singular_name' => 'サービスカテゴリ',
    'search_items' => 'サービスカテゴリを検索',
    'all_items' => '全てのサービスカテゴリ',
    'edit_item' => 'サービスカテゴリを編集',
    'add_new_item' => '新しいサービスカテゴリを追加',
    'menu_name' => 'サービスカテゴリ',
);

$args = array(
  'labels' => $labels,
  'hierarchical' => true,
  'show_ui' => true,
  'show_in_rest' => true,
);

register_taxonomy('service_category', 'service', $args);
}
add_action('init', 'aniumaservice_register_taxonomy');