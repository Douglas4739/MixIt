# MixIt - Batch Mix Calculator

A React-based web application for calculating material quantities for concrete and material batches. This tool helps you determine how much of each material you need based on your mix design and the number of batches you want to create.

## Features

### 1. **Batch Calculator**
- Select from predefined or custom mix designs
- Specify the number of batches needed
- Get a detailed breakdown of all materials required
- View total mass and volume calculations

### 2. **Mix Design Manager**
- **Create** new mix designs with custom materials and characteristics
- **Read** all your saved mix designs
- **Update** existing mix designs
- **Delete** mix designs you no longer need
- All designs are saved to browser local storage for persistence

### 3. **Volume Calculator**
- Calculate batches needed based on mold dimensions
- Uses the formula: `(L × W × H ÷ 1,728) × D × N ÷ M`
- Where:
  - L = Length (inches)
  - W = Width (inches)
  - H = Height (inches)
  - D = Density of mix (lbs/ft³)
  - N = Number of molds
  - M = Mass of a batch (lbs)
- Shows step-by-step calculation breakdown

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173` (Vite default)

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Sample Mix Designs

### Lightweight Batch VP
- **Cement**: 94 lbs
- **Plasticizer**: 45 g
- **Lightweight mix**: 338.25 lbs
- **Water**: 4.8 gal
- **Density**: 120.475 lbs/ft³
- **Volume**: 4 ft³
- **Mass per batch**: 481.9 lbs

## Usage Guide

### Creating a Batch Calculation

1. Go to the **Batch Calculator** tab
2. Select a mix design from the dropdown
3. Enter the number of batches you need
4. View the material quantities required for each item
5. See total mass and volume calculations

### Managing Mix Designs

1. Go to the **Mix Designs** tab
2. Click **"+ New Mix Design"** to create a new design
3. Fill in:
   - Mix design name
   - Material names, quantities, and units
   - Density, volume, and mass characteristics
4. Click **"Create Mix Design"** to save
5. Use the **Edit** and **Delete** buttons to manage existing designs

### Using the Volume Calculator

1. Go to the **Volume Calculator** tab
2. Enter your mold dimensions (L × W × H in inches)
3. Enter the density of your mix
4. Specify the number of molds to fill
5. Enter the mass of one batch
6. Click **"Calculate Batches Needed"**
7. View the result and calculation breakdown

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables

## Data Storage

Mix designs are stored in your browser's **Local Storage**, so they persist between sessions. No data is sent to any server.

## Browser Support

Works on all modern browsers that support:
- ES2020 JavaScript
- CSS Grid and Flexbox
- Local Storage API

## License

ISC