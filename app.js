document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enable hiding only once the lookbook observer is ready.
const lookbook = document.querySelector('.lookbook');
if (lookbook && !reduced && 'IntersectionObserver' in window) {
  const lookbookObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      lookbookObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  lookbook.querySelectorAll('.look, .lookbook-copy, .lookbook-wordmark')
    .forEach(element => lookbookObserver.observe(element));
  lookbook.classList.add('reveal-ready');
}
const products = [['Hooded Long Coat', 15, '220,000', '187,200', '1.1', '#222222', '#595954'], ['Big Collar Wool Jacket', 20, '278,000', '222,400', '2.2', '#222222', '#555552'], ['Classic Double Button Duffle Coat', 20, '229,000', '183,200', '3.2', '#222222', '#59595c'], ['Warm Suede Mustang Jacket', 25, '309,000', '231,750', '4.2', '#534237', '#403b30'], ['Soft Fur Coat', 30, '265,000', '185,500', '5.2', '#30251e', '#e2cfb5'], ['Wool Hood Jacket', 30, '419,000', '293,300', '6.2', '#222222', '#535456']];
const grid = document.querySelector('#products');
products.forEach(([name, discount, original, price, alt, c1, c2], i) => { const article = document.createElement('article'); article.className = 'product'; article.innerHTML = `<div class="product-photo"><img src="images/sec2_${i + 1}.jpg" alt="${name} 첫 번째 색상" loading="lazy"><img class="alternate" src="images/sec2_${alt}.jpg" alt="${name} 두 번째 색상" loading="lazy"></div><h3>${name}</h3><div class="pricing"><span class="discount">${discount}<small>%</small></span><div><del>${original}원</del><span class="price">${price}<small>원</small></span></div></div><div class="swatches"><button style="--swatch:${c1}" aria-label="${name} 첫 번째 색상" aria-pressed="true"></button><button style="--swatch:${c2}" aria-label="${name} 두 번째 색상" aria-pressed="false"></button></div>`; grid.append(article); let selected = 0; const buttons = [...article.querySelectorAll('.swatches button')]; function select(n) { selected = n; article.classList.toggle('alt', n === 1); buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(n === j))) } buttons.forEach((b, j) => b.addEventListener('click', () => { select(j); article.dataset.manualUntil = String(Date.now() + 9000) })); if (!reduced) setInterval(() => { if (!document.hidden && article.getBoundingClientRect().bottom > 0 && article.getBoundingClientRect().top < innerHeight && Date.now() > Number(article.dataset.manualUntil || 0) && !article.matches(':hover,:focus-within')) select(1 - selected) }, 3800 + i * 160) });
const reveal = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target) } }), { threshold: .12 }); document.querySelectorAll('.rise').forEach(el => reveal.observe(el));



const video = document.querySelector('video');
if (video) {
  new IntersectionObserver(entries => entries.forEach(e => { 
    if (e.isIntersecting && !reduced) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }), { threshold: .2 }).observe(video);

  document.addEventListener('visibilitychange', () => { 
    if (document.hidden) video.pause(); 
  });
}


// const video = document.querySelector('video'), toggle = document.querySelector('.video-toggle'); let userPaused = false;
// function syncVideo() { toggle.textContent = video.paused ? '재생' : '일시정지'; toggle.setAttribute('aria-label', video.paused ? '영상 재생' : '영상 일시정지') }
// new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting && !reduced && !userPaused) video.play().catch(syncVideo); else video.pause() }), { threshold: .2 }).observe(video);
// toggle.addEventListener('click', () => { if (video.paused) { userPaused = false; video.play().catch(syncVideo) } else { userPaused = true; video.pause() } }); video.addEventListener('play', syncVideo); video.addEventListener('pause', syncVideo); document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause() });
const dialog = document.querySelector('#coupon-dialog'); document.querySelector('.coupon').addEventListener('click', () => dialog.showModal()); dialog.querySelector('.close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close() } }); document.querySelector('#view-picks').addEventListener('click', () => { dialog.close(); document.querySelector('#picks').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) });

const filmReveal = document.querySelector('.film-reveal');
const filmObserver = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.isIntersecting)) {
    filmReveal.classList.add('visible');
    filmObserver.disconnect();
  }
}, { threshold: .35 });
filmObserver.observe(filmReveal);
document.querySelector('[data-coupon]').addEventListener('click', () => dialog.showModal());
const shippingDialog = document.querySelector('#shipping-dialog');
document.querySelector('[data-shipping]').addEventListener('click', () => shippingDialog.showModal());
shippingDialog.querySelector('.close').addEventListener('click', () => shippingDialog.close());
shippingDialog.addEventListener('click', event => {
  if (event.target === shippingDialog) {
    const bounds = shippingDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) shippingDialog.close();
  }
});

const couponHeading = dialog.querySelector('h2');
const couponDescription = couponHeading.nextElementSibling;
const originalCouponHeading = couponHeading.innerHTML;
const originalCouponDescription = couponDescription.innerHTML;
document.querySelector('[data-coupon]').addEventListener('click', () => {
  couponHeading.innerHTML = '당신의 겨울을 위한<br>최대 35% 할인 쿠폰';
  couponDescription.innerHTML = '쿠폰 적용 대상과 사용 조건은<br>정식 스토어 연결 후 확인할 수 있습니다.';
});
dialog.addEventListener('close', () => {
  couponHeading.innerHTML = originalCouponHeading;
  couponDescription.innerHTML = originalCouponDescription;
});
