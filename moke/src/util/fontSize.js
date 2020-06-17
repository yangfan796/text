const fontSize = (size) => {
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  return Math.round(size/375*width)
};

export default fontSize;
