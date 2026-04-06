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

### 3. **Color Design Manager**
- **Create** new color designs with custom pigments
- **Read** all your saved color designs
- **Update** existing color designs
- **Delete** color designs you no longer need
- Each color design includes pigment names, quantities, and units
- All designs are saved to browser local storage for persistence

### 4. **Volume Calculator**
- Calculate batches needed based on mold dimensions
- Select dimension units: **Inches** or **Feet**
- Uses the formula: `(L × W × H ÷ 1,728) × D × N ÷ M`
- Where:
  - L = Length (in selected unit)
  - W = Width (in selected unit)
  - H = Height (in selected unit)
  - D = Density of mix (lbs/ft³)
  - N = Number of molds
  - M = Mass of a batch (lbs)
- Shows step-by-step calculation breakdown with converted values

### 5. **Yardage Calculator**
- Calculate volume from dimensions (length × width × height)
- **Per-dimension unit selection**: Choose feet or inches for each dimension independently
- View results in **Cubic Feet (ft³)** or **Cubic Yards (yd³)**
- Uses the formula: `L × W × H`
- Displays conversion summary showing both ft³ and yd³
- Shows detailed calculation breakdown with unit conversions for each dimension

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

## Sample Designs

### Lightweight Batch VP (Mix Design)
- **Cement**: 94 lbs
- **Plasticizer**: 45 g
- **Lightweight mix**: 338.25 lbs
- **Water**: 4.8 gal
- **Density**: 120.475 lbs/ft³
- **Volume**: 4 ft³
- **Mass per batch**: 481.9 lbs

### 877 (Color Design)
- **877 Pigment**: 1 lbs

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

### Managing Color Designs

1. Go to the **Color Designs** tab
2. Click **"+ New Color Design"** to create a new design
3. Fill in:
   - Color design name (e.g., 877)
   - Pigment names, quantities, and units
4. Click **"Create Color Design"** to save
5. Use the **Edit** and **Delete** buttons to manage existing designs

### Using the Volume Calculator

1. Go to the **Volume Calculator** tab
2. Optionally select a **saved Mix Design** from the dropdown (fills Density and Mass automatically)
3. Or keep manual mode for custom Density and Mass values
4. Select your preferred **Dimension Unit** (Inches or Feet)
5. Enter your mold dimensions (L × W × H)
6. Enter the number of molds to fill
7. Click **"Calculate Batches Needed"**
8. View the result and calculation breakdown with converted values

### Using the Yardage Calculator

1. Go to the **Yardage Calculator** tab
2. For each dimension, enter the value and select the unit:
   - **Length (L)**: Enter value and choose feet or inches
   - **Width (W)**: Enter value and choose feet or inches
   - **Height (H)**: Enter value and choose feet or inches
3. Select your preferred **Output Unit** (Cubic Feet or Cubic Yards)
4. Click **"Calculate Volume"**
5. View the result in your chosen unit
6. See the conversion summary showing both ft³ and yd³
7. Review the detailed calculation breakdown with all conversions

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

## GitHub Pages Deployment

This repository is configured to deploy automatically to GitHub Pages from the `main` branch using GitHub Actions.

### One-time setup in GitHub

1. Open your repository on GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### Deploy flow

1. Push changes to `main`.
2. The workflow at `.github/workflows/deploy.yml` builds the app and publishes `dist/`.
3. Your site will be available at:
   - `https://douglas4739.github.io/MixIt/`

## License

ISC