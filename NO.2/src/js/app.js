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
});




$(document).ready(function() {
  $(".title").lettering();
  $(".button").lettering();
});





$(document).ready(function() {
  animation();
}, 1000);

$('.button').click(function() {
  animation();
});


function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}

