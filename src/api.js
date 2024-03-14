export async function getMenus() {
  const response = await fetch('/megaMenu.json');
  const json = await response.json();
  return json;
}

export async function audioLoad() {
  try {
    const response = await fetch('');
    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);

    return audioURL;
  } catch (error) {
    console.error('Error fetching audio: ', error);
  }
}
