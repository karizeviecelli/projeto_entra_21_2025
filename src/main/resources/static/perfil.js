
// Alternar abas
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });
}); lucide.createIcons();