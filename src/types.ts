// Types for Mix Design
export interface Material {
  name: string;
  quantity: number;
  unit: string;
}

export interface MixDesign {
  id: string;
  name: string;
  materials: Material[];
  characteristics: {
    density: number; // lbs/ft³
    volume: number; // ft³
    mass: number; // lbs
  };
  createdAt: Date;
}

// Types for Color Design
export interface Pigment {
  name: string;
  quantity: number;
  unit: string;
}

export interface ColorDesign {
  id: string;
  name: string;
  pigments: Pigment[];
  createdAt: Date;
}

// Types for saved jobs
export interface JobMaterialSnapshot {
  name: string;
  quantityPerBatch: number;
  totalQuantity: number;
  unit: string;
}

export interface JobPigmentSnapshot {
  name: string;
  quantityPerBatch: number;
  totalQuantity: number;
  unit: string;
}

export interface Job {
  id: string;
  name: string;
  mixDesignId: string;
  mixDesignName: string;
  colorDesignId: string;
  colorDesignName: string;
  batchCount: number;
  totalMass: number;
  totalVolume: number;
  materials: JobMaterialSnapshot[];
  pigments: JobPigmentSnapshot[];
  createdAt: string;
}

// Sample mix designs
export const SAMPLE_MIX_DESIGNS: MixDesign[] = [
  {
    id: '1',
    name: 'Lightweight Batch VP',
    materials: [
      { name: 'Cement', quantity: 94, unit: 'lbs' },
      { name: 'Plasticizer', quantity: 45, unit: 'g' },
      { name: 'Lightweight mix', quantity: 338.25, unit: 'lbs' },
      { name: 'Water', quantity: 4.8, unit: 'gal' },
    ],
    characteristics: {
      density: 120.475,
      volume: 4,
      mass: 481.9,
    },
    createdAt: new Date(),
  },
];

// Sample color designs
export const SAMPLE_COLOR_DESIGNS: ColorDesign[] = [
  {
    id: '1',
    name: '877',
    pigments: [
      { name: '877', quantity: 1, unit: 'lbs' },
    ],
    createdAt: new Date(),
  },
];
