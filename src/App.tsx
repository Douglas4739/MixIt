import { useState, useEffect } from 'react';
import './App.css';
import { MixDesign, ColorDesign, SAMPLE_MIX_DESIGNS, SAMPLE_COLOR_DESIGNS } from './types';
import MixDesignManager from './components/MixDesignManager';
import ColorDesignManager from './components/ColorDesignManager';
import BatchCalculator from './components/BatchCalculator';
import VolumeCalculator from './components/VolumeCalculator';

function App() {
  const [mixDesigns, setMixDesigns] = useState<MixDesign[]>([]);
  const [selectedMixId, setSelectedMixId] = useState<string>('');
  const [colorDesigns, setColorDesigns] = useState<ColorDesign[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'calculator' | 'designs' | 'colors' | 'volume'>('calculator');

  // Load mix designs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mixDesigns');
    const designs = saved ? JSON.parse(saved) : SAMPLE_MIX_DESIGNS;
    setMixDesigns(designs);
    if (designs.length > 0) {
      setSelectedMixId(designs[0].id);
    }
  }, []);

  // Save mix designs to localStorage
  useEffect(() => {
    localStorage.setItem('mixDesigns', JSON.stringify(mixDesigns));
  }, [mixDesigns]);

  // Load color designs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('colorDesigns');
    const designs = saved ? JSON.parse(saved) : SAMPLE_COLOR_DESIGNS;
    setColorDesigns(designs);
    if (designs.length > 0) {
      setSelectedColorId(designs[0].id);
    }
  }, []);

  // Save color designs to localStorage
  useEffect(() => {
    localStorage.setItem('colorDesigns', JSON.stringify(colorDesigns));
  }, [colorDesigns]);

  const handleAddMixDesign = (design: Omit<MixDesign, 'id' | 'createdAt'>) => {
    const newDesign: MixDesign = {
      ...design,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setMixDesigns([...mixDesigns, newDesign]);
    setSelectedMixId(newDesign.id);
  };

  const handleUpdateMixDesign = (id: string, design: Omit<MixDesign, 'id' | 'createdAt'>) => {
    setMixDesigns(
      mixDesigns.map((d) =>
        d.id === id
          ? {
              ...design,
              id,
              createdAt: d.createdAt,
            }
          : d
      )
    );
  };

  const handleDeleteMixDesign = (id: string) => {
    const updated = mixDesigns.filter((d) => d.id !== id);
    setMixDesigns(updated);
    if (selectedMixId === id && updated.length > 0) {
      setSelectedMixId(updated[0].id);
    } else if (updated.length === 0) {
      setSelectedMixId('');
    }
  };

  const handleAddColorDesign = (design: Omit<ColorDesign, 'id' | 'createdAt'>) => {
    const newDesign: ColorDesign = {
      ...design,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setColorDesigns([...colorDesigns, newDesign]);
    setSelectedColorId(newDesign.id);
  };

  const handleUpdateColorDesign = (id: string, design: Omit<ColorDesign, 'id' | 'createdAt'>) => {
    setColorDesigns(
      colorDesigns.map((d) =>
        d.id === id
          ? {
              ...design,
              id,
              createdAt: d.createdAt,
            }
          : d
      )
    );
  };

  const handleDeleteColorDesign = (id: string) => {
    const updated = colorDesigns.filter((d) => d.id !== id);
    setColorDesigns(updated);
    if (selectedColorId === id && updated.length > 0) {
      setSelectedColorId(updated[0].id);
    } else if (updated.length === 0) {
      setSelectedColorId('');
    }
  };

  const selectedDesign = mixDesigns.find((d) => d.id === selectedMixId);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MixIt</h1>
        <p>Batch Mix Calculator</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-tab ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          Batch Calculator
        </button>
        <button
          className={`nav-tab ${activeTab === 'designs' ? 'active' : ''}`}
          onClick={() => setActiveTab('designs')}
        >
          Mix Designs
        </button>
        <button
          className={`nav-tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          Color Designs
        </button>
        <button
          className={`nav-tab ${activeTab === 'volume' ? 'active' : ''}`}
          onClick={() => setActiveTab('volume')}
        >
          Volume Calculator
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'calculator' && selectedDesign && (
          <BatchCalculator 
            mixDesign={selectedDesign} 
            mixDesigns={mixDesigns} 
            colorDesigns={colorDesigns}
            selectedColorId={selectedColorId}
            onSelectMix={setSelectedMixId}
            onSelectColor={setSelectedColorId}
          />
        )}
        {activeTab === 'designs' && (
          <MixDesignManager
            mixDesigns={mixDesigns}
            selectedId={selectedMixId}
            onAdd={handleAddMixDesign}
            onUpdate={handleUpdateMixDesign}
            onDelete={handleDeleteMixDesign}
            onSelect={setSelectedMixId}
          />
        )}
        {activeTab === 'colors' && (
          <ColorDesignManager
            colorDesigns={colorDesigns}
            selectedId={selectedColorId}
            onAdd={handleAddColorDesign}
            onUpdate={handleUpdateColorDesign}
            onDelete={handleDeleteColorDesign}
            onSelect={setSelectedColorId}
          />
        )}
        {activeTab === 'volume' && <VolumeCalculator />}
      </main>
    </div>
  );
}

export default App;
