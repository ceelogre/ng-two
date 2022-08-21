export const imageUrl = (base64: string): string => {
  const content = base64?.charAt(0);
  let extension = null;
  switch (true) {
    case content === '/':
      extension = 'jpg';
      break;
    case content === 'i':
      extension = 'png';
      break;
    case content === 'R':
      extension = 'gif';
      break;
    case content === 'U':
      extension = 'webp';
      break;
  }
  return 'data:image/' + extension + ';base64,' + base64 ?? null;
}
