import { useState, useEffect } from 'react';
import './App.css';
import { MixDesign, SAMPLE_MIX_DESIGNS } from './types';
import MixDesignManager from './components/MixDesignManager';
import BatchCalculator from './components/BatchCalculator';
import VolumeCalculator from './components/VolumeCalculator';

function App() {
  const [mixDesigns, setMixDesigns] = useState<MixDesign[]>([]);
  const [selectedMixId, setSelectedMixId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'calculator' | 'designs' | 'volume'>('calculator');

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
          className={`nav-tab ${activeTab === 'volume' ? 'active' : ''}`}
          onClick={() => setActiveTab('volume')}
        >
          Volume Calculator
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'calculator' && selectedDesign && (
          <BatchCalculator mixDesign={selectedDesign} mixDesigns={mixDesigns} onSelectMix={setSelectedMixId} />
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
        {activeTab === 'volume' && <VolumeCalculator />}
      </main>
    </div>
  );
}

export default App;
