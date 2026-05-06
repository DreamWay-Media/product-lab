export type GalleryImage = {
  src: string | null;
  caption: string;
};

export type Gallery = {
  title: string;
  images: GalleryImage[];
};

/** Add real image URLs under /public when assets are ready */
export const galleries: Record<string, Gallery> = {
  'trail-chews': {
    title: 'Trail Chews',
    images: [
      { src: null, caption: 'Trail Chews — Packaging Front' },
      { src: null, caption: 'Trail Chews — Packaging Detail' },
      { src: null, caption: 'Trail Chews — Product Shot' },
      { src: null, caption: 'Trail Chews — Lifestyle' },
      { src: null, caption: 'Trail Chews — Brand System' },
      { src: null, caption: 'Trail Chews — Label Design' },
      { src: null, caption: 'Trail Chews — Manufacturing' },
      { src: null, caption: 'Trail Chews — Final Product' },
    ],
  },
  'food-bev': {
    title: 'Specialty Food Products',
    images: [
      { src: null, caption: 'Olives — Packaging' },
      { src: null, caption: 'Preserves — Label Design' },
      { src: null, caption: 'Wafer Rolls — Product Shot' },
      { src: null, caption: 'Canned Goods — Range' },
      { src: null, caption: 'Beverage Mixes — Brand' },
    ],
  },
  'clean-torch': {
    title: 'Clean Torch',
    images: [
      { src: null, caption: 'Clean Torch — Product Shot' },
      { src: null, caption: 'Clean Torch — Packaging' },
      { src: null, caption: 'Clean Torch — Lifestyle' },
    ],
  },
};
