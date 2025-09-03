# cursor.md — コーポレートサイト テンプレート作成指示書（HTML/CSS）

この指示書は **Cursor** に読み込ませて、そのまま HTML/CSS のベーステンプレートを自動生成するためのものです。添付画像（「ANATOMY OF A WEBSITE」）の構成を忠実に再現します。**グレーの領域はダミー画像エリアとして必ずグレーのまま**作成してください。

---

## 0. 目的 / 仕上がり

* コーポレートサイトのワンページ風テンプレート。
* 画像のラベルに対応するセクションをすべて実装。
* **BEM方式**でクラス命名（`block__element--modifier`）。
* 「まとめてCSSを当てる」ための **BEM連結指定**（例：`.section__body--head` のような、`__`+`--`連結で階層グループに一括指定）も積極採用。
* 主要ブレークポイント：**PC（≥1024px） / タブレット（≥768px < 1024px） / モバイル（<768px）**。
* 依存ライブラリなし（バニラHTML/CSSのみ）。スライダーは**静的UI**（左右矢印とドットのみ表示。動作JSは実装不要）。

---

## 1. ディレクトリ構成

```
project-root/
├─ index.html
├─ assets/
│  ├─ images/        # 画像は後で入れる。今回は未使用（プレースホルダはCSSのグレー塗り）
│  └─ fonts/         # 必要なら後日
└─ styles/
   └─ main.css
```

---

## 2. 色・タイポ・余白スケール（CSS変数）

* すべて `:root` にCSS変数を置く。
* グレーエリアは **`--gray-100: #f3f4f6` / `--gray-200: #e5e7eb` / `--gray-300: #d1d5db`** を使い分け。
* 文字色は `--text-strong: #111827`、通常 `--text: #374151`。
* アクセント（CTAボタン等）: `--accent: #111827`（黒系）。
* 余白スケール：`--space-1: 4px` / `--space-2: 8px` / `--space-3: 12px` / `--space-4: 16px` / `--space-6: 24px` / `--space-8: 32px` / `--space-12: 48px` / `--space-16: 64px`。

---

## 3. ページ構成（画像ラベル対応）

1. **Navigation Menu（ヘッダー）**
2. **Hero Section（ロゴ/見出し/CTAボタン）**
3. **Headline / Subheadline / Supporting body text**
4. **Parallax Image（固定背景のダミー帯）**
5. **Hover Effect + Thumbnail Images（3カラムギャラリー）**
6. **Banner + Full Width Image（横幅いっぱいのバナー帯）**
7. **Slider / Carousel（左右矢印・ドットのみ）**
8. **Download Your Freebie（リード獲得：入力×3 + 送信ボタン）**
9. **Footer Area / Footer Menu**

> すべての **画像エリアはグレーのプレースホルダ**で塗りつぶしてください（テキストは任意のダミー）。

---

## 4. BEM命名ルール

* **Block**: セクション基点（例：`header`, `hero`, `headline`, `parallax`, `gallery`, `banner`, `slider`, `lead`, `footer`）。
* **Element**: ブロック内の部品（例：`hero__headline`, `gallery__thumb`）。
* **Modifier**: バリエーション（例：`button--primary`, `thumb--active`）。
* **まとめ指定**: コンテキストを持たせるため、**`block__body--head`** のように `__` と `--` を連結して\*\*“要素群のグループ指定”\*\*を許可。例）`.headline__body--head { font-weight: 700; }`

---

## 5. HTML スケルトン（index.html）

> ※ Meta等は最低限。ランドマーク/ARIAも付与。

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Corporate Template</title>
  <link rel="stylesheet" href="styles/main.css" />
</head>
<body>
  <a class="skiplink" href="#main">メインへスキップ</a>

  <!-- 1) Navigation Menu -->
  <header class="header" role="banner">
    <div class="header__inner container">
      <div class="header__logo" aria-label="サイトロゴ">LOGO</div>
      <nav class="header__nav" aria-label="グローバルナビゲーション">
        <ul class="header__menu">
          <li class="header__item"><a class="header__link" href="#home">Home</a></li>
          <li class="header__item"><a class="header__link" href="#about">About</a></li>
          <li class="header__item"><a class="header__link" href="#services">Services</a></li>
          <li class="header__item"><a class="header__link" href="#blog">Blog</a></li>
          <li class="header__item"><a class="header__link" href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main" class="main" role="main">
    <!-- 2) Hero Section -->
    <section class="hero">
      <div class="hero__inner container">
        <button class="hero__cta button button--primary" type="button">CLICK HERE!</button>
      </div>
    </section>

    <!-- 3) Headline / Subheadline / Supporting text -->
    <section class="headline">
      <div class="headline__inner container">
        <h1 class="headline__title">HEADLINE</h1>
        <p class="headline__subtitle">subheadline</p>
        <p class="headline__body headline__body--head">supporting body text</p>
      </div>
    </section>

    <!-- 4) Parallax Image (グレー帯・背景固定) -->
    <section class="parallax" aria-label="パララックス帯（ダミー）">
      <div class="parallax__layer"></div>
    </section>

    <!-- 5) Hover Effect + Thumbnails (3カラム) -->
    <section class="gallery" aria-label="ギャラリーセクション">
      <div class="gallery__inner container">
        <div class="gallery__grid">
          <a href="#" class="gallery__card gallery__card--hover" aria-label="カード1">
            <div class="gallery__media" aria-hidden="true"></div>
          </a>
          <a href="#" class="gallery__card" aria-label="カード2">
            <div class="gallery__media" aria-hidden="true"></div>
          </a>
          <a href="#" class="gallery__card" aria-label="カード3">
            <div class="gallery__media" aria-hidden="true"></div>
          </a>
        </div>
      </div>
    </section>

    <!-- 6) Banner + Full Width Image (横幅いっぱいグレー帯) -->
    <section class="banner" aria-label="フル幅バナー（ダミー）">
      <div class="banner__strip" aria-hidden="true"></div>
    </section>

    <!-- 7) Slider / Carousel（静的UI） -->
    <section class="slider" aria-label="スライダー(ダミーUI)">
      <div class="slider__inner container">
        <button class="slider__arrow slider__arrow--prev" aria-label="前へ">◀</button>
        <div class="slider__track">
          <div class="slider__slide" aria-hidden="false"></div>
          <div class="slider__slide" aria-hidden="true"></div>
          <div class="slider__slide" aria-hidden="true"></div>
        </div>
        <button class="slider__arrow slider__arrow--next" aria-label="次へ">▶</button>
      </div>
      <div class="slider__dots" role="tablist" aria-label="スライド位置">
        <button class="slider__dot slider__dot--active" role="tab" aria-selected="true" aria-controls="slide-1"></button>
        <button class="slider__dot" role="tab" aria-selected="false" aria-controls="slide-2"></button>
        <button class="slider__dot" role="tab" aria-selected="false" aria-controls="slide-3"></button>
      </div>
    </section>

    <!-- 8) Lead Magnet + Email Subscribe Box -->
    <section class="lead" aria-label="資料ダウンロード（ダミー）">
      <div class="lead__inner container">
        <h2 class="lead__title">DOWNLOAD YOUR FREEBIE</h2>
        <p class="lead__detail">freebie details</p>
        <form class="lead__form" action="#" method="post">
          <input class="lead__input" type="text" name="name" placeholder="Your name" />
          <input class="lead__input" type="email" name="email" placeholder="Your email" />
          <input class="lead__input" type="text" name="company" placeholder="Company" />
          <button class="lead__button button button--primary" type="submit">Send</button>
        </form>
      </div>
    </section>
  </main>

  <!-- 9) Footer Area / Footer Menu -->
  <footer class="footer" role="contentinfo">
    <div class="footer__inner container">
      <nav class="footer__nav" aria-label="フッターメニュー">
        <ul class="footer__menu">
          <li class="footer__item"><a class="footer__link" href="#home">Home</a></li>
          <li class="footer__item"><a class="footer__link" href="#about">About</a></li>
          <li class="footer__item"><a class="footer__link" href="#services">Services</a></li>
          <li class="footer__item"><a class="footer__link" href="#blog">Blog</a></li>
          <li class="footer__item"><a class="footer__link" href="#contact">Contact</a></li>
        </ul>
      </nav>
      <small class="footer__copy">© 2025 Company Name</small>
    </div>
  </footer>
</body>
</html>
```

---

## 6. CSS（styles/main.css）

> BEMを厳格運用。**グレー領域**は必ずグレー塗りのままにする。

```css
:root {
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --text: #374151;
  --text-strong: #111827;
  --accent: #111827;
  --bg: #ffffff;

  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --radius: 12px;
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--text);
  background: var(--bg);
}

.container { width: min(1100px, 90%); margin-inline: auto; }
.skiplink { position: absolute; left: -9999px; top: -9999px; }
.skiplink:focus { left: 8px; top: 8px; background: #fff; padding: var(--space-2) var(--space-3); }

/* 1) Header */
.header { border-bottom: 1px solid var(--gray-200); background: #fff; }
.header__inner { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) 0; }
.header__logo { font-weight: 700; color: var(--text-strong); }
.header__menu { display: flex; gap: var(--space-6); list-style: none; margin: 0; padding: 0; }
.header__link { text-decoration: none; color: var(--text); }
.header__link:hover { text-decoration: underline; }

/* 2) Hero (広いグレー面 + 中央CTA) */
.hero { background: var(--gray-100); padding: var(--space-16) 0; }
.hero__inner { display: grid; place-items: center; min-height: 38vh; }
.button { display: inline-block; padding: 10px 18px; border-radius: var(--radius); border: 1px solid var(--accent); background: transparent; color: var(--accent); cursor: pointer; }
.button--primary { background: var(--accent); color: #fff; }

/* 3) Headline */
.headline { background: #fff; padding: var(--space-16) 0; text-align: center; }
.headline__title { margin: 0 0 var(--space-2); font-size: clamp(24px, 4vw, 40px); letter-spacing: 0.02em; color: var(--text-strong); }
.headline__subtitle { margin: 0 0 var(--space-4); color: var(--text); opacity: .8; font-style: italic; }
.headline__body { margin: 0; color: var(--text); }
/* まとめ指定例 */
.headline__body--head { font-weight: 500; }

/* 4) Parallax (ダミー固定背景グレー) */
.parallax { position: relative; height: 36vh; min-height: 240px; overflow: hidden; }
.parallax__layer { position: absolute; inset: 0; background: var(--gray-200); background-attachment: fixed; }

/* 5) Gallery (3カード、左はHover強調) */
.gallery { padding: var(--space-16) 0; }
.gallery__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
.gallery__card { display: block; border: 1px solid var(--gray-300); border-radius: var(--radius); overflow: hidden; }
.gallery__media { width: 100%; aspect-ratio: 1 / 1; background: var(--gray-200); }
.gallery__card--hover:hover .gallery__media { outline: 3px solid var(--accent); outline-offset: -3px; }

/* 6) Banner (フル幅グレー帯) */
.banner { background: #fff; padding: var(--space-12) 0; }
.banner__strip { height: 120px; background: var(--gray-200); }

/* 7) Slider (静的UI) */
.slider { padding: var(--space-12) 0; background: #fff; }
.slider__inner { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: var(--space-4); }
.slider__track { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
.slider__slide { height: 180px; background: var(--gray-200); border-radius: var(--radius); }
.slider__arrow { background: transparent; border: 1px solid var(--text); border-radius: 999px; width: 36px; height: 36px; cursor: pointer; }
.slider__dots { display: flex; gap: var(--space-2); justify-content: center; margin-top: var(--space-4); }
.slider__dot { width: 8px; height: 8px; border-radius: 999px; background: var(--gray-300); border: 0; }
.slider__dot--active { background: var(--text-strong); }

/* 8) Lead Magnet */
.lead { background: var(--gray-100); padding: var(--space-16) 0; text-align: center; }
.lead__title { margin: 0 0 var(--space-2); font-size: clamp(22px, 3.2vw, 32px); color: var(--text-strong); }
.lead__detail { margin: 0 0 var(--space-6); opacity: .85; }
.lead__form { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--space-3); }
.lead__input { padding: 10px 12px; border-radius: 8px; border: 1px solid var(--gray-300); background: #fff; }
.lead__button { padding: 10px 18px; }

/* 9) Footer */
.footer { background: #fff; border-top: 1px solid var(--gray-200); }
.footer__inner { padding: var(--space-12) 0; }
.footer__menu { display: flex; gap: var(--space-6); list-style: none; margin: 0 0 var(--space-2) 0; padding: 0; justify-content: center; }
.footer__link { text-decoration: none; color: var(--text); }
.footer__copy { display: block; text-align: center; color: var(--text); opacity: .7; }

/* レスポンシブ */
@media (max-width: 1023px) {
  .gallery__grid { grid-template-columns: 1fr 1fr; }
  .lead__form { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 767px) {
  .header__menu { gap: var(--space-3); }
  .hero { padding: var(--space-12) 0; }
  .gallery__grid { grid-template-columns: 1fr; }
  .lead__form { grid-template-columns: 1fr; }
}
```

---

## 7. 実装の注意

* **グレー領域**はすべて `background: var(--gray-200)`（または`--gray-100/300`）で塗り、**実画像は入れない**。
* スライダーは「UIのみ」：矢印/ドット/スライドの箱を並べるだけ。動作JSは不要。
* 見出しは中央寄せ、サブヘッドはイタリック、本文は通常テキスト。
* `__body--head` のような**BEM連結指定**は、“同一セクション内の見出し群や本文群へまとめて当てる”用途で使用可。
* コントラスト基準を満たす（CTAボタンは黒地に白文字）。

---

## 8. 品質チェックリスト

* [ ] HTML検証（W3C）でエラーなし
* [ ] a11y：ランドマーク/ラベル/フォーカス可視
* [ ] PC/タブレット/モバイルで崩れない
* [ ] すべての画像エリアが**グレー**
* [ ] BEM命名が一貫

---

## 9. ローカル表示

* 任意の静的サーバでOK（VSCodeのLive Server等）。
* `index.html` を開くだけで完成形が見える。

---

## 10. 追加要望の入れ方（Cursorプロンプト例）

> 例）「`headline__title` をもう少し大きく」「ギャラリーの1枚目だけ枠線を太く」等

```
次を反映：
1) .headline__title の font-size を clamp(28px, 5vw, 48px) に。
2) .gallery__card--hover の :hover 時、outline を 4px に。
```

以上。これをベースに、画像の構成どおりのコーポレートサイトHTML/CSSテンプレートを生成してください。
