export async function getMenus() {
  const response = await fetch('/megaMenu.json');
  const json = await response.json();
  return json;
}
