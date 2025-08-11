// console.log('読み込み開始');

// /** -----------------------------
//  *  メインスクリプト（UI側）
//  *  ----------------------------- */
// (function () {
//   let mainRan = false; // 二重実行ガード

//   function runMainScripts() {
//     if (mainRan) return;
//     mainRan = true;

//     if (!window.gsap) {
//       console.warn('[runMainScripts] GSAP が未読込です。アニメはスキップします。');
//     }

//     console.log("自作アニメーション開始");

//     const navHead = document.querySelector(".header__foot--nav_head");
//     const navBody = document.querySelector(".header__foot--nav_body");
//     const navFoot = document.querySelector(".header__foot--nav_foot");
//     const closeBtn = document.querySelector(".close-btn");
//     const serviceSection = document.querySelector('.service');

//     // 背景パララックス（rAFで間引き）
//     let ticking = false;
//     window.addEventListener("scroll", function () {
//       if (ticking) return;
//       ticking = true;
//       requestAnimationFrame(() => {
//         const scrollY = window.scrollY || window.pageYOffset || 0;
//         document.body.style.backgroundPosition = `center ${scrollY / -20}px`;
//         ticking = false;
//       });
//     }, { passive: true });

//     // ナビゲーションの表示/非表示（nullセーフ）
//     let lastScrollTop = 0;
//     window.addEventListener("scroll", () => {
//       const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;

//       const goingDown = currentScroll > lastScrollTop && currentScroll > 50;
//       const toggle = (el, add) => el && el.classList[add ? 'add' : 'remove']('fade-out');

//       toggle(navHead, goingDown);
//       toggle(navBody, goingDown);
//       toggle(navFoot, goingDown);
//       if (closeBtn) closeBtn.classList[goingDown ? 'add' : 'remove']('visible');

//       lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
//     }, { passive: true });

//     if (closeBtn) {
//       closeBtn.addEventListener("click", () => {
//         [navHead, navBody, navFoot].forEach(el => el && el.classList.remove("fade-out"));
//         closeBtn.classList.remove("visible");
//       });
//     }

//     // 文字を1文字ずつspan化（既存HTMLは上書きする仕様）
//     function applyLettering(selector) {
//       document.querySelectorAll(selector).forEach(el => {
//         const text = el.textContent || '';
//         el.innerHTML = '';
//         for (const ch of text) {
//           const span = document.createElement('span');
//           span.textContent = ch;
//           el.appendChild(span);
//         }
//       });
//     }
//     applyLettering(".title");
//     applyLettering(".button");

//     // ボタンクリックでアニメ
//     function animation () {
//       if (!window.gsap) return;
//       const timeline = gsap.timeline();
//       timeline.set(".button", { visibility: 'hidden', opacity: 0 });

//       const titleSpans = document.querySelectorAll(".title span");
//       timeline.fromTo(titleSpans,
//         { opacity: 0, bottom: "-80px" },
//         { opacity: 1, bottom: "0px", ease: "back.out(1.7)", stagger: 0.05 }
//       );

//       timeline.fromTo('.is-slide-up',
//         { opacity: 0, y: 60 },
//         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
//         '<'
//       );

//       timeline.to(".button", { visibility: 'visible', opacity: 1, duration: 0.2 });
//     }

//     document.querySelectorAll('.button').forEach(btn => {
//       btn.addEventListener('click', animation);
//     });

//     // SERVICEセクションが見えたら一度だけ起動
//     if (serviceSection) {
//       const observer = new IntersectionObserver((entries, obs) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             console.log("SERVICEセクションが表示されました");
//             animation();
//             obs.unobserve(entry.target);
//           }
//         });
//       }, { threshold: 0.5 });
//       observer.observe(serviceSection);
//     }
//   }

//   // グローバルへ公開（イントロ完了時に呼ばれる）
//   window.runMainScripts = runMainScripts;
// })();

// /** -----------------------------
//  *  イントロ（curve）ローダー
//  *  ----------------------------- */
// (() => {
//   window.runIntroCurve = function runIntroCurve(opts = {}) {
//     const {
//       canvasParent = '#js-loader',
//       textSelector = '.js-split-text',
//       text,
//       delay = 0.5,
//       bg = '#87CEFA',
//       fg = '#ffffff',
//       onComplete
//     } = opts;

//     const parent = document.querySelector(canvasParent);
//     const textEl = document.querySelector(textSelector);
//     if (!parent || !textEl) return Promise.resolve();
//     if (!window.gsap) { console.warn('[runIntroCurve] GSAP未読込'); return Promise.resolve(); }

//     const originalHTML = textEl.innerHTML;
//     const baseText = (typeof text === 'string' && text.length ? text : (textEl.dataset.text || textEl.textContent || '')).trim();
//     if (baseText) {
//       textEl.innerHTML = baseText.split('').map(ch =>
//         `<span class="char" style="display:inline-block;will-change:transform,opacity">${ch}</span>`
//       ).join('');
//     }

//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const dpr = Math.min(2, window.devicePixelRatio || 1);
//     const w = window.innerWidth, h = window.innerHeight;
//     canvas.width = w * dpr; canvas.height = h * dpr;
//     canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
//     Object.assign(canvas.style, { position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' });
//     parent.appendChild(canvas);

//     const point = { currentY: canvas.height * 5, curveY: canvas.height };
//     function draw(flag) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = bg;
//       if (flag) { ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = fg; }
//       ctx.beginPath();
//       ctx.moveTo(0, 0);
//       ctx.lineTo(0, point.currentY);
//       ctx.quadraticCurveTo(point.currentY, point.curveY / 2, canvas.width, -(canvas.height / 10));
//       ctx.lineTo(canvas.width, 0);
//       ctx.closePath();
//       ctx.fill();
//     }

//     gsap.registerEffect({
//       name: 'curveOnce',
//       defaults: { flag: true, delay: 0 },
//       effect: (_t, cfg) => gsap.timeline({ onUpdate: () => draw(cfg.flag) })
//         .to(point, { duration: 0.8, curveY: 0, ease: 'power4.out', delay: cfg.delay })
//         .to(point, { duration: 0.8, currentY: 0 }, '<')
//     });

//     function textInOut() {
//       const tl = gsap.timeline();
//       tl.set('.char', { opacity: 0, y: 50 });
//       tl.to('.char', { opacity: 1, y: 0, duration: 1, ease: 'back.out(3)', stagger: { each: 0.02 } }, '-=0.2')
//         .to('.char', { opacity: 0, y: -100, duration: 0.6, ease: 'back.in(2)', stagger: { each: 0.01, ease: 'power2' } }, '-=0.5');
//       return tl;
//     }

//     function handleResize() {
//       const d = Math.min(2, window.devicePixelRatio || 1);
//       const W = window.innerWidth, H = window.innerHeight;
//       canvas.width = W * d; canvas.height = H * d;
//       canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
//       point.currentY = canvas.height * 5; point.curveY = canvas.height;
//       draw(true);
//     }
//     window.addEventListener('resize', handleResize, { passive: true });

//     return new Promise(res => {
//       gsap.timeline({ delay })
//         .add(gsap.effects.curveOnce(point))
//         .add(baseText ? textInOut() : null)
//         .add(() => {
//           textEl.innerHTML = originalHTML;
//           window.removeEventListener('resize', handleResize);
//           canvas.remove();
//           if (typeof onComplete === 'function') { try { onComplete(); } catch (e) { console.error(e); } }
//           res();
//         });
//     });
//   };

//   // ★ どちらか1つだけ使ってください ★

//   // A) イントロ完了後に即メイン実行（推奨）
//   window.addEventListener('load', () => {
//     window.runIntroCurve({
//       onComplete: () => window.runMainScripts && window.runMainScripts()
//     });
//   });

//   // B) 5秒ディレイでメイン実行（Aをコメントアウトした上で使う）
//   // window.addEventListener('load', () => {
//   //   setTimeout(() => { window.runMainScripts && window.runMainScripts(); }, 5000);
//   // });
// })();


console.log('読み込み開始');

/** -----------------------------
 *  メインスクリプト（UI側）
 *  ----------------------------- */
(function () {
  let mainRan = false; // 二重実行ガード

  function runMainScripts() {
    if (mainRan) return;
    mainRan = true;

    if (!window.gsap) {
      console.warn('[runMainScripts] GSAP が未読込です。アニメはスキップします。');
    }

    console.log("自作アニメーション開始");

    const navHead = document.querySelector(".header__foot--nav_head");
    const navBody = document.querySelector(".header__foot--nav_body");
    const navFoot = document.querySelector(".header__foot--nav_foot");
    const closeBtn = document.querySelector(".close-btn");
    const serviceSection = document.querySelector('.service');

    // ===== ふわっと浮き上がるエフェクト登録 =====
    if (window.gsap && (!gsap.effects || !gsap.effects.floatUp)) {
      gsap.registerEffect({
        name: 'floatUp',
        // よく使う“ふわっ”の初期値
        defaults: {
          y: 24,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0,
          opacity: 0
        },
        effect: (targets, cfg) => {
          // 初期状態をしっかりセットしてからアニメ
          gsap.set(targets, { opacity: cfg.opacity, y: cfg.y, willChange: 'transform,opacity' });
          return gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: cfg.duration,
            ease: cfg.ease,
            stagger: { each: cfg.stagger },
            delay: cfg.delay,
            clearProps: 'willChange'
          });
        }
      });
    }

    // ===== スクロールで“ふわっ”を発火するユーティリティ =====
    function floatUpOnView(selector, {
      threshold = 0.2,
      rootMargin = '0px 0px -10% 0px',
      once = true,
      // エフェクトのパラメータ上書き
      y = 24, duration = 0.9, ease = 'power3.out', stagger = 0.06, delay = 0
    } = {}) {
      if (!window.gsap) return;
      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      // ちらつき防止：初期は見えない＆少し下げておく
      gsap.set(els, { opacity: 0, y });

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.effects.floatUp(entry.target, { y, duration, ease, stagger: 0, delay });
            if (once) io.unobserve(entry.target);
          }
        });
      }, { threshold, rootMargin });

      els.forEach(el => io.observe(el));
    }

    // 背景パララックス（rAFで間引き）
    let ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.backgroundPosition = `center ${scrollY / -20}px`;
        ticking = false;
      });
    }, { passive: true });

    // ナビゲーションの表示/非表示（nullセーフ）
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;

      const goingDown = currentScroll > lastScrollTop && currentScroll > 50;
      const toggle = (el, add) => el && el.classList[add ? 'add' : 'remove']('fade-out');

      toggle(navHead, goingDown);
      toggle(navBody, goingDown);
      toggle(navFoot, goingDown);
      if (closeBtn) closeBtn.classList[goingDown ? 'add' : 'remove']('visible');

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        [navHead, navBody, navFoot].forEach(el => el && el.classList.remove("fade-out"));
        closeBtn.classList.remove("visible");
      });
    }

    // 文字を1文字ずつspan化
    function applyLettering(selector) {
      document.querySelectorAll(selector).forEach(el => {
        const text = el.textContent || '';
        el.innerHTML = '';
        for (const ch of text) {
          const span = document.createElement('span');
          span.textContent = ch;
          el.appendChild(span);
        }
      });
    }
    applyLettering(".title");
    applyLettering(".button");

    // ボタンクリックでアニメ
    function animation () {
      if (!window.gsap) return;
      const timeline = gsap.timeline();
      timeline.set(".button", { visibility: 'hidden', opacity: 0 });

      // タイトルは既存の演出を維持
      const titleSpans = document.querySelectorAll(".title span");
      timeline.fromTo(titleSpans,
        { opacity: 0, bottom: "-80px" },
        { opacity: 1, bottom: "0px", ease: "back.out(1.7)", stagger: 0.05 }
      );

      // ★ “ふわっと浮き上がる”に差し替え（.is-slide-up）
      if (gsap.effects && gsap.effects.floatUp) {
        timeline.add(
          gsap.effects.floatUp('.is-slide-up', { y: 40, duration: 1.0, ease: 'power3.out', stagger: 0.06 }),
          '<' // タイトルと同時に開始
        );
      } else {
        // フォールバック
        timeline.fromTo('.is-slide-up',
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '<'
        );
      }

      timeline.to(".button", { visibility: 'visible', opacity: 1, duration: 0.2 });
    }

    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', animation);
    });

    // SERVICEセクションが見えたら一度だけ起動
    if (serviceSection) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log("SERVICEセクションが表示されました");
            animation();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(serviceSection);
    }

    // ★ 任意要素をスクロールで“ふわっ”
    //   例）<div class="is-float-up">〜</div> と付けるだけ
    floatUpOnView('.is-float-up', {
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
      once: true
    });
  }

  // グローバルへ公開（イントロ完了時に呼ばれる）
  window.runMainScripts = runMainScripts;
})();

/** -----------------------------
 *  イントロ（curve）ローダー
 *  ----------------------------- */
(() => {
  window.runIntroCurve = function runIntroCurve(opts = {}) {
    const {
      canvasParent = '#js-loader',
      textSelector = '.js-split-text',
      text,
      delay = 0.5,
      bg = '#87CEFA',
      fg = '#ffffff',
      onComplete
    } = opts;

    const parent = document.querySelector(canvasParent);
    const textEl = document.querySelector(textSelector);
    if (!parent || !textEl) return Promise.resolve();
    if (!window.gsap) { console.warn('[runIntroCurve] GSAP未読込'); return Promise.resolve(); }

    const originalHTML = textEl.innerHTML;
    const baseText = (typeof text === 'string' && text.length ? text : (textEl.dataset.text || textEl.textContent || '')).trim();
    if (baseText) {
      textEl.innerHTML = baseText.split('').map(ch =>
        `<span class="char" style="display:inline-block;will-change:transform,opacity">${ch}</span>`
      ).join('');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    Object.assign(canvas.style, { position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' });
    parent.appendChild(canvas);

    const point = { currentY: canvas.height * 5, curveY: canvas.height };
    function draw(flag) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bg;
      if (flag) { ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = fg; }
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, point.currentY);
      ctx.quadraticCurveTo(point.currentY, point.curveY / 2, canvas.width, -(canvas.height / 10));
      ctx.lineTo(canvas.width, 0);
      ctx.closePath();
      ctx.fill();
    }

    gsap.registerEffect({
      name: 'curveOnce',
      defaults: { flag: true, delay: 0 },
      effect: (_t, cfg) => gsap.timeline({ onUpdate: () => draw(cfg.flag) })
        .to(point, { duration: 0.8, curveY: 0, ease: 'power4.out', delay: cfg.delay })
        .to(point, { duration: 0.8, currentY: 0 }, '<')
    });

    function textInOut() {
      const tl = gsap.timeline();
      tl.set('.char', { opacity: 0, y: 50 });
      tl.to('.char', { opacity: 1, y: 0, duration: 1, ease: 'back.out(3)', stagger: { each: 0.02 } }, '-=0.2')
        .to('.char', { opacity: 0, y: -100, duration: 0.6, ease: 'back.in(2)', stagger: { each: 0.01, ease: 'power2' } }, '-=0.5');
      return tl;
    }

    function handleResize() {
      const d = Math.min(2, window.devicePixelRatio || 1);
      const W = window.innerWidth, H = window.innerHeight;
      canvas.width = W * d; canvas.height = H * d;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      point.currentY = canvas.height * 5; point.curveY = canvas.height;
      draw(true);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    return new Promise(res => {
      const tl = gsap.timeline({ delay })
    
        // 1) 曲面ロールアップ（ここで上まで巻き上げ）
        .add(gsap.effects.curveOnce(point))
    
        // 2) クロスフェード開始ラベル
        .add('reveal')
    
        // 3) メインをゆっくりフェードイン＋少しだけ持ち上げ
        .add(() => {
          const main = document.querySelector('main');
          if (!main) return;
    
          // ちらつき防止
          gsap.set(main, { autoAlpha: 0, y: 20, willChange: 'transform,opacity' });
    
          // メインをゆっくり露出（速度は duration を調整：1.2〜1.6 推奨）
          gsap.to(main, {
            autoAlpha: 1,
            y: 0,
            duration: 1.3,
            ease: 'power2.out',
            onComplete: () => gsap.set(main, { clearProps: 'willChange' })
          });
        }, 'reveal+=0.05') // ロール完了の直後に少し遅らせて開始
    
        // 4) キャンバス自体をフェードアウトしてクロスフェード（重なり0.05秒）
        .to(canvas, {
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out'
        }, 'reveal')
    
        // 5) 片付け & メイン起動
        .add(() => {
          window.removeEventListener('resize', handleResize);
          canvas.remove(); // フェード完了後に除去
          textEl.innerHTML = originalHTML;
          if (typeof onComplete === 'function') {
            try { onComplete(); } catch (e) { console.error(e); }
          }
          res();
        });
    });
  };

  // ★ どちらか1つだけ使うこと（A推奨） ★

  // A) イントロ完了後に即メイン実行（推奨）
  window.addEventListener('load', () => {
    window.runIntroCurve({
      onComplete: () => window.runMainScripts && window.runMainScripts()
    });
  });

  // B) 5秒ディレイでメイン実行（Aをコメントアウトした上で使う）
  // window.addEventListener('load', () => {
  //   setTimeout(() => { window.runMainScripts && window.runMainScripts(); }, 5000);
  // });
})();