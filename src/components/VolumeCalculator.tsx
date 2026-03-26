import React, { useState } from 'react';
import './VolumeCalculator.css';

interface VolumeInput {
  length: number;
  width: number;
  height: number;
  density: number;
  numMolds: number;
  massBatch: number;
}

export default function VolumeCalculator() {
  const [inputs, setInputs] = useState<VolumeInput>({
    length: 0,
    width: 0,
    height: 0,
    density: 0,
    numMolds: 0,
    massBatch: 0,
  });
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (field: keyof VolumeInput, value: number) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  const calculateBatches = (e: React.FormEvent) => {
    e.preventDefault();

    const { length, width, height, density, numMolds, massBatch } = inputs;

    if (massBatch === 0) {
      alert('Mass of batch cannot be zero');
      return;
    }

    // Formula: (L×W×H÷1,728)×D×N÷M
    const volumePerMold = (length * width * height) / 1728; // Convert cubic inches to cubic feet
    const totalVolume = volumePerMold * density;
    const batchesNeeded = (totalVolume * numMolds) / massBatch;

    setResult(batchesNeeded);
  };

  return (
    <div className="volume-calculator">
      <div className="section">
        <h2 className="section-title">Volume & Batch Calculator</h2>

        <div className="card">
          <h3>Batch Calculation Formula</h3>
          <div className="formula-box">
            <p>
              <code>(L) × (W) × (H) ÷ 1,728 × (D) × (N) ÷ (M)</code>
            </p>
            <div className="formula-legend">
              <div>
                <strong>L</strong> = Length (inches)
              </div>
              <div>
                <strong>W</strong> = Width (inches)
              </div>
              <div>
                <strong>H</strong> = Height (inches)
              </div>
              <div>
                <strong>D</strong> = Density of mix (lbs/ft³)
              </div>
              <div>
                <strong>N</strong> = Number of molds
              </div>
              <div>
                <strong>M</strong> = Mass of a batch (lbs)
              </div>
            </div>
          </div>

          <h4>Mold Dimensions (in inches)</h4>
          <div className="grid-3">
            <div>
              <label>Length (L) *</label>
              <input
                type="number"
                value={inputs.length}
                onChange={(e) => handleInputChange('length', Number(e.target.value))}
                placeholder="e.g., 12"
                step="0.1"
              />
            </div>
            <div>
              <label>Width (W) *</label>
              <input
                type="number"
                value={inputs.width}
                onChange={(e) => handleInputChange('width', Number(e.target.value))}
                placeholder="e.g., 12"
                step="0.1"
              />
            </div>
            <div>
              <label>Height (H) *</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => handleInputChange('height', Number(e.target.value))}
                placeholder="e.g., 12"
                step="0.1"
              />
            </div>
          </div>

          <h4>Mix Properties</h4>
          <div className="grid-3">
            <div>
              <label>Density of Mix (lbs/ft³) *</label>
              <input
                type="number"
                value={inputs.density}
                onChange={(e) => handleInputChange('density', Number(e.target.value))}
                placeholder="e.g., 120.475"
                step="0.01"
              />
            </div>
            <div>
              <label>Number of Molds (N) *</label>
              <input
                type="number"
                value={inputs.numMolds}
                onChange={(e) => handleInputChange('numMolds', Number(e.target.value))}
                placeholder="e.g., 1"
                step="1"
                min="1"
              />
            </div>
            <div>
              <label>Mass of a Batch (lbs) *</label>
              <input
                type="number"
                value={inputs.massBatch}
                onChange={(e) => handleInputChange('massBatch', Number(e.target.value))}
                placeholder="e.g., 481.9"
                step="0.01"
              />
            </div>
          </div>

          <button className="btn-primary" onClick={calculateBatches} style={{ marginTop: '1.5rem' }}>
            Calculate Batches Needed
          </button>
        </div>

        {result !== null && (
          <div className="card result-card">
            <h3>Result</h3>
            <div className="result-display">
              <div className="result-value">
                <strong>Batches Needed:</strong>
                <p className="large-number">{result.toFixed(2)}</p>
              </div>
              <div className="result-legend">
                <p>
                  To fill <strong>{inputs.numMolds}</strong> mold(s) with dimensions{' '}
                  <strong>
                    {inputs.length}" × {inputs.width}" × {inputs.height}"
                  </strong>
                  , you need approximately <strong>{Math.ceil(result)}</strong> full batches (or{' '}
                  <strong>{result.toFixed(2)}</strong> batches exactly).
                </p>
              </div>
            </div>

            <div className="calculation-breakdown">
              <h4>Calculation Breakdown:</h4>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <strong>Volume per mold (ft³)</strong>
                  <p>({inputs.length} × {inputs.width} × {inputs.height}) ÷ 1,728 = {(inputs.length * inputs.width * inputs.height / 1728).toFixed(4)}</p>
                </div>
                <div className="breakdown-item">
                  <strong>Total volume (lbs)</strong>
                  <p>
                    {(inputs.length * inputs.width * inputs.height / 1728).toFixed(4)} × {inputs.density} = {((inputs.length * inputs.width * inputs.height / 1728) * inputs.density).toFixed(2)}
                  </p>
                </div>
                <div className="breakdown-item">
                  <strong>Volume × Number of molds</strong>
                  <p>
                    {((inputs.length * inputs.width * inputs.height / 1728) * inputs.density).toFixed(2)} × {inputs.numMolds} = {(((inputs.length * inputs.width * inputs.height / 1728) * inputs.density) * inputs.numMolds).toFixed(2)}
                  </p>
                </div>
                <div className="breakdown-item">
                  <strong>Batches needed</strong>
                  <p>
                    {(((inputs.length * inputs.width * inputs.height / 1728) * inputs.density) * inputs.numMolds).toFixed(2)} ÷ {inputs.massBatch} = {result.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
