import React, { useState } from 'react';
import './YardageCalculator.css';

interface YardageInput {
  length: number;
  width: number;
  height: number;
}

interface DimensionUnits {
  length: DimensionUnit;
  width: DimensionUnit;
  height: DimensionUnit;
}

type DimensionUnit = 'inches' | 'feet';
type OutputUnit = 'cubic-feet' | 'cubic-yards';

const UNIT_CONVERSIONS: Record<DimensionUnit, number> = {
  inches: 1,
  feet: 12,
};

export default function YardageCalculator() {
  const [inputs, setInputs] = useState<YardageInput>({
    length: 0,
    width: 0,
    height: 0,
  });
  const [dimensionUnits, setDimensionUnits] = useState<DimensionUnits>({
    length: 'feet',
    width: 'feet',
    height: 'inches',
  });
  const [outputUnit, setOutputUnit] = useState<OutputUnit>('cubic-feet');
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (field: keyof YardageInput, value: number) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  const handleUnitChange = (field: keyof DimensionUnits, value: DimensionUnit) => {
    setDimensionUnits({
      ...dimensionUnits,
      [field]: value,
    });
  };

  const calculateVolume = (e: React.FormEvent) => {
    e.preventDefault();

    const { length, width, height } = inputs;

    // Convert each dimension to inches using its specific unit
    const lengthInches = length * UNIT_CONVERSIONS[dimensionUnits.length];
    const widthInches = width * UNIT_CONVERSIONS[dimensionUnits.width];
    const heightInches = height * UNIT_CONVERSIONS[dimensionUnits.height];

    // Calculate volume in cubic feet (1728 cubic inches = 1 cubic foot)
    const volumeCubicFeet = (lengthInches * widthInches * heightInches) / 1728;

    // Convert to output unit if needed (27 cubic feet = 1 cubic yard)
    const volumeResult = outputUnit === 'cubic-yards' ? volumeCubicFeet / 27 : volumeCubicFeet;

    setResult(volumeResult);
  };

  const lengthInches = inputs.length * UNIT_CONVERSIONS[dimensionUnits.length];
  const widthInches = inputs.width * UNIT_CONVERSIONS[dimensionUnits.width];
  const heightInches = inputs.height * UNIT_CONVERSIONS[dimensionUnits.height];
  const volumeCubicFeet = (lengthInches * widthInches * heightInches) / 1728;
  const volumeCubicYards = volumeCubicFeet / 27;

  return (
    <div className="yardage-calculator">
      <div className="section">
        <h2 className="section-title">Yardage Calculator</h2>

        <div className="card">
          <h3>Volume Calculation</h3>
          <div className="formula-box">
            <p>
              <code>(L) × (W) × (H)</code>
            </p>
            <div className="formula-legend">
              <div>
                <strong>L</strong> = Length ({dimensionUnits.length})
              </div>
              <div>
                <strong>W</strong> = Width ({dimensionUnits.width})
              </div>
              <div>
                <strong>H</strong> = Height ({dimensionUnits.height})
              </div>
            </div>
          </div>

          <h4>Dimensions</h4>
          <div className="dimensions-grid">
            <div className="dimension-group">
              <label>Length (L) *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={inputs.length}
                  onChange={(e) => handleInputChange('length', Number(e.target.value))}
                  placeholder="e.g., 10"
                  step="0.1"
                />
                <select
                  value={dimensionUnits.length}
                  onChange={(e) => handleUnitChange('length', e.target.value as DimensionUnit)}
                >
                  <option value="inches">in</option>
                  <option value="feet">ft</option>
                </select>
              </div>
            </div>
            <div className="dimension-group">
              <label>Width (W) *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={inputs.width}
                  onChange={(e) => handleInputChange('width', Number(e.target.value))}
                  placeholder="e.g., 10"
                  step="0.1"
                />
                <select
                  value={dimensionUnits.width}
                  onChange={(e) => handleUnitChange('width', e.target.value as DimensionUnit)}
                >
                  <option value="inches">in</option>
                  <option value="feet">ft</option>
                </select>
              </div>
            </div>
            <div className="dimension-group">
              <label>Height (H) *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => handleInputChange('height', Number(e.target.value))}
                  placeholder="e.g., 1"
                  step="0.1"
                />
                <select
                  value={dimensionUnits.height}
                  onChange={(e) => handleUnitChange('height', e.target.value as DimensionUnit)}
                >
                  <option value="inches">in</option>
                  <option value="feet">ft</option>
                </select>
              </div>
            </div>
          </div>

          <h4>Output Unit</h4>
          <div className="grid-2">
            <div>
              <label>Show results in:</label>
              <select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value as OutputUnit)}>
                <option value="cubic-feet">Cubic Feet (ft³)</option>
                <option value="cubic-yards">Cubic Yards (yd³)</option>
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={calculateVolume} style={{ marginTop: '1.5rem' }}>
            Calculate Volume
          </button>
        </div>

        {result !== null && (
          <div className="card result-card">
            <h3>Result</h3>
            <div className="result-display">
              <div className="result-value">
                <strong>Volume:</strong>
                <p className="large-number">
                  {result.toFixed(2)} {outputUnit === 'cubic-yards' ? 'yd³' : 'ft³'}
                </p>
              </div>
              <div className="result-legend">
                <p>
                  A space measuring <strong>{inputs.length} {dimensionUnits.length}</strong> ×{' '}
                  <strong>{inputs.width} {dimensionUnits.width}</strong> × <strong>{inputs.height} {dimensionUnits.height}</strong> has a
                  volume of <strong>{result.toFixed(2)} {outputUnit === 'cubic-yards' ? 'cubic yards' : 'cubic feet'}</strong>.
                </p>
              </div>
            </div>

            <div className="conversion-box">
              <h4>Conversion Summary</h4>
              <div className="conversion-grid">
                <div className="conversion-item">
                  <strong>Cubic Feet (ft³)</strong>
                  <p>{volumeCubicFeet.toFixed(2)}</p>
                </div>
                <div className="conversion-item">
                  <strong>Cubic Yards (yd³)</strong>
                  <p>{volumeCubicYards.toFixed(4)}</p>
                </div>
              </div>
            </div>

            <div className="calculation-breakdown">
              <h4>Calculation Breakdown:</h4>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <strong>Convert to inches</strong>
                  <p>
                    {inputs.length} {dimensionUnits.length} × {UNIT_CONVERSIONS[dimensionUnits.length]} = {lengthInches.toFixed(2)}"
                    <br />
                    {inputs.width} {dimensionUnits.width} × {UNIT_CONVERSIONS[dimensionUnits.width]} = {widthInches.toFixed(2)}"
                    <br />
                    {inputs.height} {dimensionUnits.height} × {UNIT_CONVERSIONS[dimensionUnits.height]} = {heightInches.toFixed(2)}"
                  </p>
                </div>
                <div className="breakdown-item">
                  <strong>Calculate cubic inches</strong>
                  <p>
                    {lengthInches.toFixed(2)} × {widthInches.toFixed(2)} × {heightInches.toFixed(2)} ={' '}
                    {(lengthInches * widthInches * heightInches).toFixed(2)} in³
                  </p>
                </div>
                <div className="breakdown-item">
                  <strong>Convert to cubic feet</strong>
                  <p>
                    {(lengthInches * widthInches * heightInches).toFixed(2)} in³ ÷ 1,728 = {volumeCubicFeet.toFixed(4)} ft³
                  </p>
                </div>
                <div className="breakdown-item">
                  <strong>Convert to cubic yards</strong>
                  <p>
                    {volumeCubicFeet.toFixed(4)} ft³ ÷ 27 = {volumeCubicYards.toFixed(6)} yd³
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
