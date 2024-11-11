export const grinchMarker = () => {
  const el = document.createElement('div');
  el.className = 'custom-marker';

  const img = document.createElement('img');
  img.src = '/images/grinch.webp';
  img.style.width = '25px';
  img.style.height = '25px';

  el.appendChild(img);
  return el;
};
