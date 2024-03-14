export async function getMenus() {
  const response = await fetch('/megaMenu.json');
  const json = await response.json();
  return json;
}

export async function audioLoad() {
  try {
    const response = await fetch(
      'https://bongabangaudio.s3.ap-southeast-2.amazonaws.com/audio/newoutput_v1_20240309142553.mp3'
    );
    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);

    return audioURL;
  } catch (error) {
    console.error('Error fetching audio: ', error);
  }
}
