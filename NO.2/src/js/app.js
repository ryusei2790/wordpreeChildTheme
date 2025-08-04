console.log('読み込み開始');

document.addEventListener("DOMContentLoaded", () => {
  //
  const navHead = document.querySelector(".header__foot--nav_head");
  const navBody = document.querySelector(".header__foot--nav_body");
  const navFoot = document.querySelector(".header__foot--nav_foot");
  const closeBtn = document.querySelector(".close-btn");
  console.log(closeBtn);
  let lastScrollTop = 0;
  
  //ナビゲーションバー
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
  })


  


  //文字アニメーション

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

  // setTimeout(() => {
  //   animation();
  // }, 1000);

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
});

//画像アニメーション
document.addEventListener("DOMContentLoaded", () => {
  console.log("画像アニメーション準備");
  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger.defaults({
  //   markers: true  // ← デバッグ用。動いたら削除してOK
  // });

  const cards = document.querySelectorAll(".card");
  console.log("カード要素数:", cards.length);

  cards.forEach((el) => {
    gsap.fromTo(
      el, 
      { y: 50, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        },
      }
    );
  });
});