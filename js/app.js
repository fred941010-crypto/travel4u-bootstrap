// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化：檢查頁面上所有的愛心按鈕，根據 LocalStorage 更新狀態
    updateFavoriteButtons();

    // 2. 綁定事件：監聽所有帶有 .btn-favorite 類別的按鈕點擊
    // 注意：請回到 index.html 將按鈕加上 class="btn-favorite" 並設定 data-id 等屬性
    const buttons = document.querySelectorAll('.btn-favorite');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 阻止按鈕預設跳轉行為（如果是 <a> 標籤的話）
            e.preventDefault();
            
            // 取得該按鈕上的資料
            const tourData = {
                id: btn.dataset.id,
                title: btn.dataset.title,
                img: btn.dataset.img,
                price: btn.dataset.price
            };

            toggleFavorite(tourData, btn);
        });
    });
});

/**
 * 取得目前的收藏列表
 */
function getFavorites() {
    return JSON.parse(localStorage.getItem('travel4u_favorites') || '[]');
}

/**
 * 切換收藏狀態 (新增或移除)
 * @param {Object} tour - 行程資料物件
 * @param {HTMLElement} btnElement - 被點擊的按鈕元素 (用來更新 UI)
 */
function toggleFavorite(tour, btnElement) {
    let favs = getFavorites();
    const existingIndex = favs.findIndex(f => f.id === tour.id);

    if (existingIndex === -1) {
        // 不存在，則新增
        favs.push(tour);
        // 更新 UI：變更圖示為實心愛心
        updateIconState(btnElement, true);
        console.log(`已加入收藏: ${tour.title}`);
    } else {
        // 已存在，則移除
        favs.splice(existingIndex, 1);
        // 更新 UI：變更圖示為空心愛心
        updateIconState(btnElement, false);
        console.log(`已取消收藏: ${tour.title}`);
    }

    // 存回 LocalStorage
    localStorage.setItem('travel4u_favorites', JSON.stringify(favs));
}

/**
 * 更新單一按鈕的圖示狀態
 * @param {HTMLElement} btn - 按鈕元素
 * @param {boolean} isFavorite - 是否已收藏
 */
function updateIconState(btn, isFavorite) {
    const icon = btn.querySelector('i');
    if (isFavorite) {
        // 變更為實心愛心 (FontAwesome solid)
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.classList.add('text-danger'); // 變成紅色
    } else {
        // 變更為空心愛心 (FontAwesome regular)
        icon.classList.remove('fa-solid');
        icon.classList.remove('text-danger');
        icon.classList.add('fa-regular');
    }
}

/**
 * 頁面載入時，批次更新所有按鈕的狀態
 */
function updateFavoriteButtons() {
    const favs = getFavorites();
    const buttons = document.querySelectorAll('.btn-favorite');

    buttons.forEach(btn => {
        const id = btn.dataset.id;
        const exists = favs.some(f => f.id === id);
        updateIconState(btn, exists);
    });
}
