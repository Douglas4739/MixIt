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

// Hardcoded preset mix designs — always visible, never editable or deletable
export const PRESET_MIX_DESIGNS: MixDesign[] = [
  {
    id: 'preset-lwvp',
    name: 'Lightweight VP',
    materials: [
      { name: 'Cement', quantity: 94, unit: 'lbs.' },
      { name: 'LW Rock/Sand mix', quantity: 338.45, unit: 'lbs.' },
      { name: 'Water', quantity: 4.8, unit: 'gal.' },
      { name: 'Plasticizer', quantity: 45, unit: 'g.' },
    ],
    characteristics: {
      density: 120.525,
      volume: 4,
      mass: 482.1,
    },
    createdAt: new Date('2026-01-01'),
  },
];

// Sample mix designs (used as default when no user data exists in localStorage)
export const SAMPLE_MIX_DESIGNS: MixDesign[] = [];

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
