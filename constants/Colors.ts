const palette = {
  blue: '#2f95dc',
  blueSoft: '#4da3e8',
  green: '#4caf6a',
  amber: '#e0a03d',
  red: '#e05d5d',
  sky: '#3d8ee0',
  white: '#fff',
  black: '#000',
};

export default {
  light: {
    text: palette.black,
    textMuted: 'rgba(0,0,0,0.55)',
    background: palette.white,
    surface: 'rgba(128,128,128,0.10)',
    track: 'rgba(128,128,128,0.25)',
    // tint подсвечивает активные табы; primary — фон акцентных кнопок.
    // В тёмной теме tint белый, поэтому для кнопок он не подходит.
    tint: palette.blue,
    primary: palette.blue,
    onPrimary: palette.white,
    success: palette.green,
    warning: palette.amber,
    danger: palette.red,
    info: palette.sky,
    tabIconDefault: '#ccc',
    tabIconSelected: palette.blue,
  },
  dark: {
    text: palette.white,
    textMuted: 'rgba(255,255,255,0.6)',
    background: palette.black,
    surface: 'rgba(128,128,128,0.18)',
    track: 'rgba(128,128,128,0.3)',
    tint: palette.white,
    primary: palette.blueSoft,
    onPrimary: palette.white,
    success: palette.green,
    warning: palette.amber,
    danger: palette.red,
    info: palette.sky,
    tabIconDefault: '#ccc',
    tabIconSelected: palette.white,
  },
};
