import React, { useState } from 'react';
import { MixDesign } from '../types';
import './BatchCalculator.css';

interface Props {
  mixDesign: MixDesign;
  mixDesigns: MixDesign[];
  onSelectMix: (id: string) => void;
}

export default function BatchCalculator({ mixDesign, mixDesigns, onSelectMix }: Props) {
  const [numBatches, setNumBatches] = useState(1);

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0.1, Number(e.target.value));
    setNumBatches(value);
  };

  const calculateMaterial = (baseQuantity: number) => {
    return baseQuantity * numBatches;
  };

  const totalMass = mixDesign.characteristics.mass * numBatches;

  return (
    <div className="batch-calculator">
      <div className="section">
        <h2 className="section-title">Batch Calculator</h2>

        <div className="card">
          <div className="grid-2">
            <div>
              <label>Select Mix Design</label>
              <select value={mixDesign.id} onChange={(e) => onSelectMix(e.target.value)}>
                {mixDesigns.map((design) => (
                  <option key={design.id} value={design.id}>
                    {design.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Number of Batches</label>
              <input
                type="number"
                value={numBatches}
                onChange={handleBatchChange}
                min="0.1"
                step="0.1"
                placeholder="Enter number of batches"
              />
            </div>
          </div>
        </div>

        <div className="results-container">
          <div className="card">
            <h3>{mixDesign.name}</h3>
            <div className="info-box">
              <p>
                <strong>Base Mix (1 batch):</strong> {mixDesign.characteristics.mass} lbs
              </p>
              <p>
                <strong>Number of Batches:</strong> {numBatches}
              </p>
              <p>
                <strong>Total Mass Required:</strong> {totalMass.toFixed(2)} lbs
              </p>
            </div>

            <h4>Materials Needed</h4>
            <div className="materials-table">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Per Batch</th>
                    <th>Unit</th>
                    <th>×</th>
                    <th>Batches</th>
                    <th>=</th>
                    <th>Total Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {mixDesign.materials.map((material, idx) => (
                    <tr key={idx}>
                      <td>{material.name}</td>
                      <td>{material.quantity}</td>
                      <td>{material.unit}</td>
                      <td>×</td>
                      <td>{numBatches}</td>
                      <td>=</td>
                      <td className="highlight">{calculateMaterial(material.quantity).toFixed(2)} {material.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4>Mix Characteristics</h4>
            <div className="characteristics-grid">
              <div className="char-box">
                <strong>Density</strong>
                <p>{mixDesign.characteristics.density} lbs/ft³</p>
              </div>
              <div className="char-box">
                <strong>Volume per Batch</strong>
                <p>{mixDesign.characteristics.volume} ft³</p>
              </div>
              <div className="char-box">
                <strong>Total Volume</strong>
                <p>{(mixDesign.characteristics.volume * numBatches).toFixed(2)} ft³</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
