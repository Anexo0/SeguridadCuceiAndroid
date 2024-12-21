import {PixelRatio} from 'react-native';

export function normFS(size) {
  const scale = PixelRatio.getFontScale();
  var scaledSize = size * scale;
  const newSize = (size - scaledSize) / scale + size;
  return newSize;
}

