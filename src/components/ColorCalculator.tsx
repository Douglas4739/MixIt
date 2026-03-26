import React, { useState } from 'react';
import { ColorDesign } from '../types';
import './ColorCalculator.css';

interface Props {
  colorDesign: ColorDesign;
  colorDesigns: ColorDesign[];
  onSelectColor: (id: string) => void;
}

export default function ColorCalculator({ colorDesign, colorDesigns, onSelectColor }: Props) {
  const [numBatches, setNumBatches] = useState(1);

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0.1, Number(e.target.value));
    setNumBatches(value);
  };

  const calculatePigment = (baseQuantity: number) => {
    return baseQuantity * numBatches;
  };

  return (
    <div className="color-calculator">
      <div className="section">
        <h2 className="section-title">Color Calculator</h2>

        <div className="card">
          <div className="grid-2">
            <div>
              <label>Select Color Design</label>
              <select value={colorDesign.id} onChange={(e) => onSelectColor(e.target.value)}>
                {colorDesigns.map((design) => (
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
            <h3>{colorDesign.name}</h3>
            <div className="info-box">
              <p>
                <strong>Number of Batches:</strong> {numBatches}
              </p>
            </div>

            <h4>Pigments Needed</h4>
            <div className="pigments-table">
              <table>
                <thead>
                  <tr>
                    <th>Pigment</th>
                    <th>Per Batch</th>
                    <th>Unit</th>
                    <th>×</th>
                    <th>Batches</th>
                    <th>=</th>
                    <th>Total Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {colorDesign.pigments.map((pigment, idx) => (
                    <tr key={idx}>
                      <td>{pigment.name}</td>
                      <td>{pigment.quantity}</td>
                      <td>{pigment.unit}</td>
                      <td>×</td>
                      <td>{numBatches}</td>
                      <td>=</td>
                      <td className="highlight">{calculatePigment(pigment.quantity).toFixed(2)} {pigment.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
