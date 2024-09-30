// script.js
document.addEventListener("DOMContentLoaded", function () {
  const floatingButton = document.getElementById("floating-button");
  const hideSection = document.querySelector(".hide-section");
  const showPosition = 300; // スクロール位置（ピクセル）

  function checkScroll() {
    const scrollPosition = window.scrollY;

    // 300px以上スクロールしたらボタンを表示
    if (scrollPosition >= showPosition) {
      floatingButton.classList.add("visible");
    } else {
      floatingButton.classList.remove("visible");
    }

    // 特定のセクションに入ったらボタンを非表示（既存の機能を維持）
    const hideSectionTop = hideSection.getBoundingClientRect().top;
    const hideSectionBottom = hideSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (hideSectionTop <= windowHeight && hideSectionBottom >= 0) {
      floatingButton.classList.add("hidden");
    } else {
      floatingButton.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // 初回実行
});

document
  .getElementById("floating-button")
  .addEventListener("click", function () {
    alert("お問い合わせボタンがクリックされました！");
  });
