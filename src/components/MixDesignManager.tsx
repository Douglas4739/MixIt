import React, { useState } from 'react';
import { MixDesign, Material, PRESET_MIX_DESIGNS } from '../types';
import './MixDesignManager.css';

interface Props {
  mixDesigns: MixDesign[];
  selectedId: string;
  onAdd: (design: Omit<MixDesign, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, design: Omit<MixDesign, 'id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

export default function MixDesignManager({
  mixDesigns,
  selectedId,
  onAdd,
  onUpdate,
  onDelete,
  onSelect,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<MixDesign, 'id' | 'createdAt'>>({
    name: '',
    materials: [{ name: '', quantity: 0, unit: '' }],
    characteristics: {
      density: 0,
      volume: 0,
      mass: 0,
    },
  });

  const handleAddClick = () => {
    setFormData({
      name: '',
      materials: [{ name: '', quantity: 0, unit: '' }],
      characteristics: { density: 0, volume: 0, mass: 0 },
    });
    setEditing(null);
    setShowForm(true);
  };

  const handleEditClick = (design: MixDesign) => {
    setFormData({
      name: design.name,
      materials: design.materials,
      characteristics: design.characteristics,
    });
    setEditing(design.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
    const updated = [...formData.materials];
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? Number(value) : value,
    };
    setFormData({
      ...formData,
      materials: updated,
    });
  };

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: '', quantity: 0, unit: '' }],
    });
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, i) => i !== index),
    });
  };

  const handleCharacteristicChange = (field: keyof typeof formData.characteristics, value: number) => {
    setFormData({
      ...formData,
      characteristics: {
        ...formData.characteristics,
        [field]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a mix design name');
      return;
    }
    if (formData.materials.some((m) => !m.name.trim() || m.quantity === 0 || !m.unit.trim())) {
      alert('Please fill all material fields');
      return;
    }

    if (editing) {
      onUpdate(editing, formData);
    } else {
      onAdd(formData);
    }
    handleCancel();
  };

  return (
    <div className="mix-design-manager">
      <div className="section">
        <div className="flex justify-between align-center">
          <h2 className="section-title">Mix Designs</h2>
          <button className="btn-primary" onClick={handleAddClick}>
            + New Mix Design
          </button>
        </div>

        {!showForm ? (
          <div className="card-row">
            {PRESET_MIX_DESIGNS.map((design) => (
              <div key={design.id} className={`card mix-design-card preset-card ${selectedId === design.id ? 'selected' : ''}`}>
                <div className="preset-badge">Preset</div>
                <h3>{design.name}</h3>
                <div className="characteristics">
                  <div>
                    <strong>Density:</strong> {design.characteristics.density} lbs/ft³
                  </div>
                  <div>
                    <strong>Volume:</strong> {design.characteristics.volume} ft³
                  </div>
                  <div>
                    <strong>Mass:</strong> {design.characteristics.mass} lbs
                  </div>
                </div>
                <div className="materials-preview">
                  <strong>Materials:</strong>
                  <ul>
                    {design.materials.map((material, idx) => (
                      <li key={idx}>
                        {material.name}: {material.quantity} {material.unit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex" style={{ gap: '0.5rem' }}>
                  <button className="btn-secondary btn-small" onClick={() => onSelect(design.id)}>
                    Select
                  </button>
                </div>
              </div>
            ))}
            {mixDesigns.map((design) => (
              <div key={design.id} className={`card mix-design-card ${selectedId === design.id ? 'selected' : ''}`}>
                <h3>{design.name}</h3>
                <div className="characteristics">
                  <div>
                    <strong>Density:</strong> {design.characteristics.density} lbs/ft³
                  </div>
                  <div>
                    <strong>Volume:</strong> {design.characteristics.volume} ft³
                  </div>
                  <div>
                    <strong>Mass:</strong> {design.characteristics.mass} lbs
                  </div>
                </div>
                <div className="materials-preview">
                  <strong>Materials:</strong>
                  <ul>
                    {design.materials.map((material, idx) => (
                      <li key={idx}>
                        {material.name}: {material.quantity} {material.unit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex" style={{ gap: '0.5rem' }}>
                  <button className="btn-secondary btn-small" onClick={() => onSelect(design.id)}>
                    Select
                  </button>
                  <button className="btn-secondary btn-small" onClick={() => handleEditClick(design)}>
                    Edit
                  </button>
                  <button className="btn-danger btn-small" onClick={() => onDelete(design.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {mixDesigns.length === 0 && <p className="no-user-designs">No custom mix designs yet. Create one to get started!</p>}
          </div>
        ) : (
          <div className="card">
            <h3>{editing ? 'Edit Mix Design' : 'Create New Mix Design'}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Mix Design Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g., Lightweight Batch VP"
                />
              </div>

              <div className="section">
                <h4>Materials</h4>
                {formData.materials.map((material, idx) => (
                  <div key={idx} className="grid-3">
                    <div>
                      <label>Material Name *</label>
                      <input
                        type="text"
                        value={material.name}
                        onChange={(e) => handleMaterialChange(idx, 'name', e.target.value)}
                        placeholder="e.g., Cement"
                      />
                    </div>
                    <div>
                      <label>Quantity *</label>
                      <input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => handleMaterialChange(idx, 'quantity', e.target.value)}
                        placeholder="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label>Unit *</label>
                      <input
                        type="text"
                        value={material.unit}
                        onChange={(e) => handleMaterialChange(idx, 'unit', e.target.value)}
                        placeholder="e.g., lbs"
                      />
                    </div>
                    {formData.materials.length > 1 && (
                      <button
                        type="button"
                        className="btn-danger btn-small"
                        onClick={() => handleRemoveMaterial(idx)}
                        style={{ marginTop: '1.5rem' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={handleAddMaterial}>
                  + Add Material
                </button>
              </div>

              <div className="section">
                <h4>Characteristics</h4>
                <div className="grid-3">
                  <div>
                    <label>Density (lbs/ft³) *</label>
                    <input
                      type="number"
                      value={formData.characteristics.density}
                      onChange={(e) => handleCharacteristicChange('density', Number(e.target.value))}
                      placeholder="e.g., 120.475"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label>Volume (ft³) *</label>
                    <input
                      type="number"
                      value={formData.characteristics.volume}
                      onChange={(e) => handleCharacteristicChange('volume', Number(e.target.value))}
                      placeholder="e.g., 4"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label>Mass (lbs) *</label>
                    <input
                      type="number"
                      value={formData.characteristics.mass}
                      onChange={(e) => handleCharacteristicChange('mass', Number(e.target.value))}
                      placeholder="e.g., 481.9"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="flex">
                <button type="submit" className="btn-success">
                  {editing ? 'Update' : 'Create'} Mix Design
                </button>
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
