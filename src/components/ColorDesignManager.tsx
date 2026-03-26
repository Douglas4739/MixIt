import React, { useState } from 'react';
import { ColorDesign, Pigment } from '../types';
import './ColorDesignManager.css';

interface Props {
  colorDesigns: ColorDesign[];
  selectedId: string;
  onAdd: (design: Omit<ColorDesign, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, design: Omit<ColorDesign, 'id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

export default function ColorDesignManager({
  colorDesigns,
  selectedId,
  onAdd,
  onUpdate,
  onDelete,
  onSelect,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ColorDesign, 'id' | 'createdAt'>>({
    name: '',
    pigments: [{ name: '', quantity: 0, unit: '' }],
  });

  const handleAddClick = () => {
    setFormData({
      name: '',
      pigments: [{ name: '', quantity: 0, unit: '' }],
    });
    setEditing(null);
    setShowForm(true);
  };

  const handleEditClick = (design: ColorDesign) => {
    setFormData({
      name: design.name,
      pigments: design.pigments,
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

  const handlePigmentChange = (index: number, field: keyof Pigment, value: string | number) => {
    const updated = [...formData.pigments];
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? Number(value) : value,
    };
    setFormData({
      ...formData,
      pigments: updated,
    });
  };

  const handleAddPigment = () => {
    setFormData({
      ...formData,
      pigments: [...formData.pigments, { name: '', quantity: 0, unit: '' }],
    });
  };

  const handleRemovePigment = (index: number) => {
    setFormData({
      ...formData,
      pigments: formData.pigments.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a color design name');
      return;
    }
    if (formData.pigments.some((p) => !p.name.trim() || p.quantity === 0 || !p.unit.trim())) {
      alert('Please fill all pigment fields');
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
    <div className="color-design-manager">
      <div className="section">
        <div className="flex justify-between align-center">
          <h2 className="section-title">Color Designs</h2>
          <button className="btn-primary" onClick={handleAddClick}>
            + New Color Design
          </button>
        </div>

        {!showForm ? (
          <div className="card-row">
            {colorDesigns.map((design) => (
              <div key={design.id} className={`card color-design-card ${selectedId === design.id ? 'selected' : ''}`}>
                <div className="color-preview" style={{ backgroundColor: `#${design.name.padStart(6, '0')}` }}></div>
                <h3>{design.name}</h3>
                <div className="pigments-preview">
                  <strong>Pigments:</strong>
                  <ul>
                    {design.pigments.map((pigment, idx) => (
                      <li key={idx}>
                        {pigment.name}: {pigment.quantity} {pigment.unit}
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
            {colorDesigns.length === 0 && <p>No color designs yet. Create one to get started!</p>}
          </div>
        ) : (
          <div className="card">
            <h3>{editing ? 'Edit Color Design' : 'Create New Color Design'}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Color Design Name (e.g., 877) *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g., 877"
                />
              </div>

              <div className="section">
                <h4>Pigments</h4>
                {formData.pigments.map((pigment, idx) => (
                  <div key={idx} className="grid-3">
                    <div>
                      <label>Pigment Name *</label>
                      <input
                        type="text"
                        value={pigment.name}
                        onChange={(e) => handlePigmentChange(idx, 'name', e.target.value)}
                        placeholder="e.g., 877"
                      />
                    </div>
                    <div>
                      <label>Quantity *</label>
                      <input
                        type="number"
                        value={pigment.quantity}
                        onChange={(e) => handlePigmentChange(idx, 'quantity', e.target.value)}
                        placeholder="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label>Unit *</label>
                      <input
                        type="text"
                        value={pigment.unit}
                        onChange={(e) => handlePigmentChange(idx, 'unit', e.target.value)}
                        placeholder="e.g., lbs"
                      />
                    </div>
                    {formData.pigments.length > 1 && (
                      <button
                        type="button"
                        className="btn-danger btn-small"
                        onClick={() => handleRemovePigment(idx)}
                        style={{ marginTop: '1.5rem' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={handleAddPigment}>
                  + Add Pigment
                </button>
              </div>

              <div className="flex">
                <button type="submit" className="btn-success">
                  {editing ? 'Update' : 'Create'} Color Design
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
