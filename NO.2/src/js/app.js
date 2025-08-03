console.log('読み込み開始');

document.addEventListener("DOMContentLoaded", () => {
  const navHead = document.querySelector(".header__foot--nav_head");
  const navBody = document.querySelector(".header__foot--nav_body");
  const navFoot = document.querySelector(".header__foot--nav_foot");
  const closeBtn = document.querySelector(".close-btn");
  console.log(closeBtn);
  let lastScrollTop = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    

    if (currentScroll > lastScrollTop & currentScroll > 50) {
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

  setTimeout(() => {
    animation();
  }, 1000);

  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', animation);
  });

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



