<?php
/**
 *  THe header for our theme
 * 
 * This is the template that diplays all of the <head> section and everything up until <div id="content">
 * 
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * 
 * @package nomal
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
    <style>
        body {
            background-image: url('<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/background.png');
        }
        </style>


	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
    <div id="page" class="site">
    <a class="skip-link screen-reader-text" href="/"><?php esc_html_e( 'Skip to content', 'nomal' ); ?></a>
    <p class="heading js-split-text"></p>
    <header class="header">
    <div class="header__body is-slide-up">
        <a href="<?php echo home_url("/"); ?>">
            <div class="header__body--image">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.png" />
            </div>
        </a>
    </div>
    <div class="header__foot">
        <nav class="header__foot--nav_head global-nav">
            <ul class="header__foot--nav_head-nav global-nav__list">
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/team"); ?>">メンバー紹介</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/about"); ?>">概要</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/history"); ?>">歴史</a></li>
            </ul>
        </nav>
        <nav class="header__foot--nav_body global-nav">
            <ul class="header__foot--nav_head-nav global-nav__list">
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/project"); ?>">プロジェクト</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/service"); ?>">サービス</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/vision"); ?>">展望</a></li>
            </ul>
        </nav>
        <nav class="header__foot--nav_foot global-nav">
            <ul class="header__foot--nav_head-nav global-nav__list">
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/works"); ?>">AboutUs</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/contact"); ?>">contact</a></li>
                <li class="is-slide-up global-nav__item"><a href="<?php echo home_url("/faq"); ?>">FAQ</a></li>
            </ul>
        </nav>
        <button class="close-btn">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/close.png" alt="Close Button" class="close">
        </button>
    </div>
</header>
