enum ColorStyleNavigation {
  text = 'text',
  bg = 'bg',
  icon = 'icon',
}

const stylesNavigation: Record<ColorStyleNavigation, string> = {
  text: 'text-deep-sapphire',
  bg: 'bg-pale-cyan',
  icon: 'fill-deep-sapphire stroke-deep-sapphire',
};

export { ColorStyleNavigation, stylesNavigation };
