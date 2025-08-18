<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package nomal
 */

get_header();
?>

<section class="main" id="main">
        <div class="main-visual">
            <div class="main__body--head">
                <p>Unleash your code. Unleash your way of working.</p>
            </div>
            <div class="main__body--body">
                <h1>
                    コードを自由に。働き方も自由に。
                </h1>
            </div>
            <div class="main__body--foot">
                <p>
                    私たちは堅苦しい「専門家」ではありません。
                    <span>
                        東京を拠点に、自由な発想でデジタルの可能性を広げるデジタルクリエイティブチーム『アニューマ』です。</br>
                        スーツではなくGパンとパーカーを身にまとい、最新のWebテクノロジーを武器に、あなたのアイデアを形にする頼れるパートナー。
                    </span>
                    デジタルの力で、あなたの想いを現実のものに変えていきます。
                </p>
            </div>
            <div class="main__foot--body">
                <div class="main__foot--body_head">
                    <button >README →</button>
                </div>
                <div class="main__foot--body_foot">
                    <button >プロジェクトを始める</button>
                </div>
                
            </div>
        </div>
        <div id="js-loader">
        </div>
    </section>
    <section class="team" id="team">
        <div class="team__head" >
            <h1>TEAM</h1>
        </div>
        <div class="team__body">
            <div class="team__body--member">
                <div class="team__body--member_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/__.png" alt="aniuma">
                </div>
                <div class="team__body--member_feat">
                    Founder & Vision Hacker
                </div>
                <div class="team__body--member_name">
                    <h2>
                        Susumu Seino
                    </h2>
                </div>
                <div class="team__body--member_description">
                    <p>
                        <span>
                            清野 奨
                        </span></br>
                        コードは詩、バグは個性、締め切りは幻想—デジタルの自由を探求する永遠の旅人
                    </p>
                </div>
            </div>
            <div class="team__body--member">
                <div class="team__body--member_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/__.png" alt="aniuma">
                </div>
                <div class="team__body--member_feat">
                    Code Wizard
                </div>
                <div class="team__body--member_name">
                    <h2>
                        Ryo Ikeda
                    </h2>
                </div>
                <div class="team__body--member_description">
                    <p>
                        <span>
                            池田 嶺 
                        </span></br>
                        バグは魔法の杖一振りで消え、不可能は単なる長めの関数にすぎない
                    </p>
                </div>
            </div>
            <div class="team__body--member">
                <div class="team__body--member_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/__.png" alt="aniuma">
                </div>
                <div class="team__body--member_feat">
                    Talk & Shutter Master
                </div>
                <div class="team__body--member_name">
                    <h2>
                        Yasuhiro Obuchi
                    </h2>
                </div>
                <div class="team__body--member_description">
                    <p>
                        <span>
                            大渕 康弘
                        </span></br>
                        1枚の写真に1000行のコードより多くを語らせる。酒を飲むと彼はその10倍語る。
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section class="service" id="service">
        <div class="service__head" >
            <h1>SERVICE</h1>
            <discription>
                AIアプリ開発・導入支援を軸に、WordPressサイト構築とECサイト開発も提供。
                最新技術を活用し、お客様のビジョンに合った使いやすいデジタルソリューションを実現します。
            </discription>
        </div>
        <div class="service__body">
            <div class="service__body--cards">
                <div class="service__body--cards_title">
                    <h3>
                        生成AI活用
                    </h3>
                    <discription>
                        AIアプリの開発や導入支援
                    </discription>
                </div>
                <div class="service__body--cards_about">
                    <ul>
                        <li>
                            <h5>
                                <span>AIアプリ開発</span> / 業務システム連携対応対応
                            </h5>
                            <discription>
                                AIを活用したカスタムアプリケーションの設計・開発サービスを提供します。ビジネスニーズに合わせた独自のAIソリューションを構築します。
                            </discription>
                        </li>
                        <li>
                            <h5>
                                <span>RAG システム構築 </span>
                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="service__body--cards">
                <div class="service__body--cards_title">
                    <h3>

                    </h3>
                    <discription>
    
                    </discription>
                </div>
                <div class="service__body--cards_about">
                    <ul>
                        <li>
                            <h5>

                            </h5>
                            <discription>

                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="service__body--cards">
                <div class="service__body--cards_title">
                    <h3>

                    </h3>
                    <discription>
    
                    </discription>
                </div>
                <div class="service__body--cards_about">
                    <ul>
                        <li>
                            <h5>

                            </h5>
                            <discription>

                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="service__body--cards">
                <div class="service__body--cards_title">
                    <h3>

                    </h3>
                    <discription>
    
                    </discription>
                </div>
                <div class="service__body--cards_about">
                    <ul>
                        <li>
                            <h5>

                            </h5>
                            <discription>

                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                        <li>
                            <h5>

                            </h5>
                            <discription>
                                
                            </discription>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="works" id="works">
        
    </section>


<?php
get_sidebar();
get_footer();
