
console.log('読み込み開始');

function runMainScripts() {
    const navHead = document.querySelector(".header__foot--nav_head");
    const navBody = document.querySelector(".header__foot--nav_body");
    const navFoot = document.querySelector(".header__foot--nav_foot");
    const closeBtn = document.querySelector(".close-btn");
    console.log(closeBtn);
    let lastScrollTop = 0;
  
    // 背景アクション
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;
      document.body.style.backgroundPosition = `center ${scrollY / -20}px`;
    });
  
    // ナビゲーションバー
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
      if (currentScroll > lastScrollTop && currentScroll > 50) {
        navHead.classList.add("fade-out");
        navBody.classList.add("fade-out");
        navFoot.classList.add("fade-out");
        closeBtn.classList.add("visible");
      } else {
        navHead.classList.remove("fade-out");
        navBody.classList.remove("fade-out");
        navFoot.classList.remove("fade-out");
        closeBtn.classList.remove("visible");
      }
  
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  
    closeBtn.addEventListener("click", () => {
      navHead.classList.remove("fade-out");
      navBody.classList.remove("fade-out");
      navFoot.classList.remove("fade-out");
      closeBtn.classList.remove("visible");
    });
  
    function applyLettering(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          el.appendChild(span);
        });
      });
    }
  
    applyLettering(".title");
    applyLettering(".button");
  
    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', animation);
    });
  
    const serviceSection = document.querySelector('.service');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("SERVICEセクションが表示されました");
          animation();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    observer.observe(serviceSection);
  
    function animation () {
      const timeline = gsap.timeline();
  
      timeline.set(".button", { visibility: 'hidden', opacity: 0 });
  
      const titleSpans = document.querySelectorAll(".title span");
      timeline.fromTo(titleSpans,
        {
          opacity: 0,
          bottom: "-80px"
        }, {
          opacity: 1,
          bottom: "0px",
          ease: "back.out(1.7)",
          stagger: 0.05
        }
      );
  
      timeline.to(".button", { visibility: 'visible', opacity: 1, duration: 0.2 });
    }
  }

  

class Curve {
    constructor(callback) {
        this.callback = callback;
      const str = 'aniuma'
      let text = ''
      str.split('').forEach(e => {
        text += `<span class="char">${e}</span>`
      })
      document.querySelector('.js-split-text').innerHTML = text
  
      gsap.set('.char', {
        opacity: 0,
        y: 50,
      })
  
      this.obj = document.querySelector('#js-loader')
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
  
      this.canvasSize = {
        width: innerWidth,
        height: innerHeight
      }
  
      this.canvas.width = this.canvasSize.width * Math.min(2, devicePixelRatio)
      this.canvas.height = this.canvasSize.height * Math.min(2, devicePixelRatio)
  
      this.canvas.style.width = `${this.canvasSize.width}px`
      this.canvas.style.height = `${this.canvasSize.height}px`
  
      this.obj.appendChild(this.canvas)
  
      this.point = {
        currentY: this.canvas.height * 5,
        curveY: this.canvas.height 
      }
  
      this.init()
    }
  
    init() {
      gsap.registerEffect({
        name: 'curve',
  
        defaults: {
          flag: true,
          delay: 0,
        },
  
        effect: (target, config) => {
          const tl = gsap.timeline({
            onUpdate: () => {
              this.curveUpdate(config.flag)
            }
          })
            .to(target, {
              duration: .8,
              curveY: 0,
              ease: 'power4.out',
              delay: config.delay
            })
            .to(target, {
              currentY: 0,
              duration: .8,
            }, '<')
          return tl
        }
      })
  
      const tl = gsap.timeline({ delay: .5 })
        .add(gsap.effects.curve(this.point))
        .add(this.textAnimation.bind(this))
        .set(this.point, {
          currentY: this.canvas.height * 5,
          curveY: this.canvas.height 
        })
        .set('.is-slide-up:not(.global-nav__item)', {
          opacity: 0,
          y: 60
        })
        .add(gsap.effects.curve(this.point, { flag: false }), '+=2')
        .from('.main-visual img', {
          autoAlpha: 0,
          yPercent: 20,
          duration: 1,
          ease: 'power4.out'
        }, '-=0.3')
        .add(this.slideUpText.bind(this), '<')
        // .add(() => {
        //     this.removeClasses(); // クラス削除
        //     if (this.callback) this.callback(); 
        // });

        this.setupScrollEvents();
        this.hideSplitText();
    }

    removeClasses() {
        document.querySelectorAll('.is-slide-up').forEach(el => {
          el.classList.remove('is-slide-up');
        });
      }
  
    textAnimation() {
        const tl = gsap.timeline()
          .to('.char', {
            opacity: 1,
            y: 0, 
            duration: 1,
            ease: 'back.out(3)',
            stagger: {
              each: 0.02,
            }
          }, '-=0.2')
          .to('.char', {
            opacity: 0,
            y: -100,
            duration: .6,
            ease: 'back.in(2)',
            stagger: {
              each: 0.01,
              ease: 'power2'
            }
          }, '-=0.5')
      
      return tl
      }
  
    slideUpText() {
      gsap.to('.is-slide-up',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: {
            each: .05, // 遅延させる時間
            from: 'end' // 開始位置の指定 start, end, center, edges, random
          }
        }
      )
    }
  
  
    curveUpdate(flag) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = '#87CEFA'
  
      if (flag) {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = '#ffffff'
      }
  
      console.log(this.canvas.width / 2);
      console.log(this.point.curveY);
      console.log(this.canvas.width);
      console.log(this.point.currentY);
  
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(0, this.point.currentY)
      // this.ctx.quadraticCurveTo(this.canvas.width / 2, this.point.curveY, this.canvas.width, this.point.currentY)
      this.ctx.quadraticCurveTo(this.point.currentY, this.point.curveY / 2 , this.canvas.width, -(this.canvas.height / 10))
      this.ctx.lineTo(this.canvas.width, 0)
      this.ctx.closePath()
      this.ctx.fill()
    }
  }
  
  addEventListener('load', _ => {
    new Curve(runMainScripts)
  })

// ヘッダーアニメーション
// document.addEventListener("DOMContentLoaded", () => {

//     const navHead = document.querySelector(".header__foot--nav_head");
//     const navBody = document.querySelector(".header__foot--nav_body");
//     const navFoot = document.querySelector(".header__foot--nav_foot");
//     const closeBtn = document.querySelector(".close-btn");
//   console.log(closeBtn);
//     let lastScrollTop = 0;
  
//   //背景アクション
//     window.addEventListener("scroll", function () {
//     // スクロール量を元にちょっとだけ背景のY位置を動かす（例えば1/20の量だけ）
//       const scrollY = window.scrollY;
//       document.body.style.backgroundPosition = `center ${scrollY / -20}px`;
//     });
  
//   //ナビゲーションバー
//     window.addEventListener("scroll", () => {
//       const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  

//       if (currentScroll > lastScrollTop && currentScroll > 50) {
//         navHead.classList.add("fade-out");
//         navBody.classList.add("fade-out");
//         navFoot.classList.add("fade-out");
//         closeBtn.classList.add("visible");
//       } else {
//         navHead.classList.remove("fade-out");
//         navBody.classList.remove("fade-out");
//         navFoot.classList.remove("fade-out");
//         closeBtn.classList.remove("visible");
//       }
  
//       lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
//     });
  
//     closeBtn.addEventListener("click", () => {
//       navHead.classList.remove("fade-out");
//       navBody.classList.remove("fade-out");
//       navFoot.classList.remove("fade-out");
//       closeBtn.classList.remove("visible");
//   })
  

  


//   //文字アニメーション

//     function applyLettering(selector) {
//       const elements = document.querySelectorAll(selector);
//       elements.forEach(el => {
//         const text = el.textContent;
//         el.innerHTML = '';
//         text.split('').forEach(char => {
//           const span = document.createElement('span');
//           span.textContent = char;
//           el.appendChild(span);
//         });
//       });
//     }
  
//     applyLettering(".title");
//     applyLettering(".button");
  
//   // setTimeout(() => {
//   //   animation();
//   // }, 1000);

//     document.querySelectorAll('.button').forEach(btn => {
//       btn.addEventListener('click', animation);
//     });
  
//     const serviceSection = document.querySelector('.service');
//     const observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           console.log("SERVICEセクションが表示されました");
//           animation();
//           observer.unobserve(entry.target);
//         }
//       });
//     }, {
//       threshold: 0.5
//     });
//     observer.observe(serviceSection);
  

//   function animation () {
//       const timeline = gsap.timeline();
  
//       timeline.set(".button", { visibility: 'hidden', opacity: 0 });
  
//       const titleSpans = document.querySelectorAll(".title span");
//       timeline.fromTo(titleSpans,
//         {
//           opacity: 0,
//           bottom: "-80px"
//         }, {
//           opacity: 1,
//           bottom: "0px",
//           ease: "back.out(1.7)",
//           stagger: 0.05
//         }
//       );
  
//       timeline.to(".button", { visibility: 'visible', opacity: 1, duration: 0.2 });

//     }
//   });

// // 初期ローディングアニメーション
  
