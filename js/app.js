document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteButtons();
    const buttons = document.querySelectorAll('.btn-favorite');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
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

function getFavorites() { return JSON.parse(localStorage.getItem('travel4u_favorites') || '[]'); }

function toggleFavorite(tour, btnElement) {
    let favs = getFavorites();
    const index = favs.findIndex(f => f.id === tour.id);
    if (index === -1) { favs.push(tour); } else { favs.splice(index, 1); }
    localStorage.setItem('travel4u_favorites', JSON.stringify(favs));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favs = getFavorites();
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const isFav = favs.some(f => f.id === btn.dataset.id);
        const icon = btn.querySelector('i');
        if(isFav) {
            icon.classList.replace('fa-regular', 'fa-solid');
            icon.classList.add('text-danger');
        } else {
            icon.classList.replace('fa-solid', 'fa-regular');
            icon.classList.remove('text-danger');
        }
    });
}
