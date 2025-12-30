document.addEventListener('DOMContentLoaded', () => {
    // 1. 頁面載入時，檢查並更新所有愛心按鈕的狀態
    updateFavoriteButtons();

    // 2. 為所有帶有 .btn-favorite 的按鈕加上點擊事件
    const buttons = document.querySelectorAll('.btn-favorite');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // 防止按鈕亂跳
            
            // 從 HTML 的 data- 屬性抓取行程資料
            const tourData = {
                id: btn.dataset.id,
                title: btn.dataset.title,
                img: btn.dataset.img,
                price: btn.dataset.price
            };

            // 執行切換收藏邏輯
            toggleFavorite(tourData, btn);
        });
    });
});

/**
 * 取得目前的收藏列表 (從 LocalStorage)
 */
function getFavorites() {
    return JSON.parse(localStorage.getItem('travel4u_favorites') || '[]');
}

/**
 * 切換收藏狀態：如果沒有就新增，如果有就移除
 */
function toggleFavorite(tour, btnElement) {
    let favs = getFavorites();
    const existingIndex = favs.findIndex(f => f.id === tour.id);

    if (existingIndex === -1) {
        // 新增收藏
        favs.push(tour);
        updateIconState(btnElement, true);
    } else {
        // 移除收藏
        favs.splice(existingIndex, 1);
        updateIconState(btnElement, false);
    }

    // 存回 LocalStorage
    localStorage.setItem('travel4u_favorites', JSON.stringify(favs));
}

/**
 * 更新按鈕圖示：實心(已收藏) 或 空心(未收藏)
 */
function updateIconState(btn, isFavorite) {
    const icon = btn.querySelector('i');
    if (isFavorite) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-danger'); // 實心紅愛心
    } else {
        icon.classList.remove('fa-solid', 'text-danger');
        icon.classList.add('fa-regular'); // 空心愛心
    }
}

/**
 * 批次更新頁面按鈕狀態 (用於重新整理後保持狀態)
 */
function updateFavoriteButtons() {
    const favs = getFavorites();
    const buttons = document.querySelectorAll('.btn-favorite');

    buttons.forEach(btn => {
        const id = btn.dataset.id;
        // 檢查這個按鈕的 ID 是否在收藏清單裡
        const exists = favs.some(f => f.id === id);
        updateIconState(btn, exists);
    });
}
