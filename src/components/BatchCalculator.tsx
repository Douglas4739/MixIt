import React, { useState } from 'react';
import { MixDesign, ColorDesign } from '../types';
import './BatchCalculator.css';

interface Props {
  mixDesign: MixDesign;
  mixDesigns: MixDesign[];
  colorDesigns: ColorDesign[];
  selectedMixId: string;
  selectedColorId: string;
  initialBatches: number;
  resetSignal: number;
  onSelectMix: (id: string) => void;
  onSelectColor: (id: string) => void;
  onSaveJob: (jobName: string, batchCount: number) => void;
  onOpenJobs: () => void;
}

export default function BatchCalculator({ 
  mixDesign, 
  mixDesigns, 
  colorDesigns,
  selectedMixId,
  selectedColorId,
  initialBatches,
  resetSignal,
  onSelectMix,
  onSelectColor,
  onSaveJob,
  onOpenJobs
}: Props) {
  const [numBatches, setNumBatches] = useState(initialBatches);
  const [margin, setMargin] = useState(0);
  const selectedColor = colorDesigns.find((d) => d.id === selectedColorId);

  React.useEffect(() => {
    setNumBatches(initialBatches);
  }, [initialBatches, resetSignal]);

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0.1, Number(e.target.value));
    setNumBatches(value);
  };

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setMargin(value);
  };

  const marginFactor = 1 + margin / 100;

  const calculateMaterial = (baseQuantity: number) => {
    return baseQuantity * numBatches * marginFactor;
  };

  const totalMass = mixDesign.characteristics.mass * numBatches * marginFactor;

  const buildBatchSummary = () => {
    const header = [
      `Job Summary`,
      `Mix Design: ${mixDesign.name}`,
      `Color Design: ${selectedColor?.name || 'None'}`,
      `Batch Count: ${numBatches}`,
      ...(margin > 0 ? [`Margin: ${margin}%`] : []),
      `Total Mass: ${totalMass.toFixed(2)} lbs`,
      `Total Volume: ${(mixDesign.characteristics.volume * numBatches * marginFactor).toFixed(2)} ft3`,
      '',
      'Materials:',
      ...mixDesign.materials.map(
        (material) =>
          `- ${material.name}: ${calculateMaterial(material.quantity).toFixed(2)} ${material.unit}`
      ),
    ];

    if (selectedColor) {
      header.push('', 'Pigments:');
      header.push(
        ...selectedColor.pigments.map(
          (pigment) =>
            `- ${pigment.name}: ${calculateMaterial(pigment.quantity).toFixed(2)} ${pigment.unit}`
        )
      );
    }

    return header.join('\n');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const summaryText = buildBatchSummary();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Batch Summary - ${mixDesign.name}`,
          text: summaryText,
        });
        return;
      } catch {
        // Fall through to clipboard for declined or unsupported share scenarios.
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(summaryText);
      alert('Batch summary copied to clipboard.');
      return;
    }

    alert('Share is not available on this device.');
  };

  const handleSave = () => {
    if (!selectedMixId) {
      alert('Please select a mix design before saving a job.');
      return;
    }

    const jobName = window.prompt('Enter a Job Name:');
    if (!jobName || !jobName.trim()) {
      alert('Job name is required.');
      return;
    }

    onSaveJob(jobName.trim(), numBatches);
    onOpenJobs();
  };

  return (
    <div className="batch-calculator">
      <div className="section">
        <h2 className="section-title">Batch Calculator</h2>

        <div className="card">
          <div className="grid-3">
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

            <div>
              <label>Margin %</label>
              <input
                type="number"
                value={margin}
                onChange={handleMarginChange}
                min="0"
                max="100"
                step="1"
                placeholder="0"
              />
            </div>
          </div>

          {colorDesigns.length > 0 && (
            <div style={{ marginTop: 'var(--padding-md)' }}>
              <label>Select Color Design (Optional)</label>
              <select value={selectedColorId} onChange={(e) => onSelectColor(e.target.value)}>
                <option value="">-- None --</option>
                {colorDesigns.map((design) => (
                  <option key={design.id} value={design.id}>
                    {design.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="calculator-actions no-print">
            <button type="button" className="btn-secondary" onClick={handlePrint}>
              Print
            </button>
            <button type="button" className="btn-secondary" onClick={handleShare}>
              Share
            </button>
            <button
              type="button"
              className="btn-success"
              onClick={handleSave}
              disabled={!selectedMixId}
            >
              Save
            </button>
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
              {margin > 0 && (
                <p>
                  <strong>Margin:</strong> {margin}% &nbsp;
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85em' }}>
                    (×{marginFactor.toFixed(3)} applied to all quantities)
                  </span>
                </p>
              )}
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
                    <th>{margin > 0 ? `Total + ${margin}% Margin` : 'Total Needed'}</th>
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
                <p>{(mixDesign.characteristics.volume * numBatches * marginFactor).toFixed(2)} ft³</p>
              </div>
            </div>

            {selectedColor && (
              <>
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
                        <th>{margin > 0 ? `Total + ${margin}% Margin` : 'Total Needed'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedColor.pigments.map((pigment, idx) => (
                        <tr key={idx}>
                          <td>{pigment.name}</td>
                          <td>{pigment.quantity}</td>
                          <td>{pigment.unit}</td>
                          <td>×</td>
                          <td>{numBatches}</td>
                          <td>=</td>
                          <td className="highlight">{calculateMaterial(pigment.quantity).toFixed(2)} {pigment.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
