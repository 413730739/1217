function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background('#F5F5DC'); // 米白色
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// DOM interaction: 點擊下方縮圖放入中間算式
document.addEventListener('DOMContentLoaded', () => {
  const categoryMap = {
    'cat-who': 'placeholder-who',
    'cat-where': 'placeholder-where',
    'cat-what': 'placeholder-what'
  };

  // 為每個縮圖加上點擊事件
  document.querySelectorAll('.thumbs img').forEach(img => {
    img.addEventListener('click', (e) => {
      const parent = img.closest('.category');
      if (!parent) return;
      const cid = parent.id; // e.g. cat-who
      const targetId = categoryMap[cid];
      if (!targetId) return;

      // 取消同類其他已選狀態
      parent.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');

      // 設定中間對應的 placeholder 圖片
      const src = img.getAttribute('data-src') || img.src;
      const target = document.getElementById(targetId);
      // 取得縮圖的 figcaption（若有）作為文字
      const captionEl = img.closest('figure') ? img.closest('figure').querySelector('figcaption') : null;
      const captionText = captionEl ? captionEl.textContent.trim() : (img.alt || '');
      if (target) {
        target.src = src;
      }
      // 同步文字到對應 caption 元素（id: caption-<who|where|what>）
      const captionId = targetId.replace('placeholder-', 'caption-');
      const captionTarget = document.getElementById(captionId);
      if (captionTarget) captionTarget.textContent = captionText;
    });
  });

  // 允許點擊 placeholder 清除（可選）
  document.querySelectorAll('.placeholder').forEach(ph => {
    ph.addEventListener('click', () => {
      ph.src = '';
      // 清除對應 caption
      const captionId = ph.id.replace('placeholder-', 'caption-');
      const captionEl = document.getElementById(captionId);
      if (captionEl) captionEl.textContent = '';
      // 取消底部已選
      const term = ph.id.replace('placeholder-', 'cat-');
      const cat = document.getElementById(term);
      if (cat) cat.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
    });
  });
});
