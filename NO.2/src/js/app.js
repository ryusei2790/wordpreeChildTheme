console.log('読み込み開始');

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  const rect = nav.getBoundingClientRect();
  const trigger = window.innerHeight * 0.8;
  console.log('変数定義完了');

  if (rect.top < trigger) {
    nav.classList.add('show');
  }
  console.log('動き完了');
});
