<script>
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

function toggleFavorite(place, title, img) {
  let favs = getFavorites();
  const exists = favs.find(f => f.place === place);
  if (!exists) {
    favs.push({ place, title, img });
    saveFavorites(favs);
    alert('已加入收藏');
  } else {
    alert('已收藏過');
  }
}
</script>
