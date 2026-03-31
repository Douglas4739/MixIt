import { useState, useEffect } from 'react';
import './App.css';
import { MixDesign, ColorDesign, Job, SAMPLE_MIX_DESIGNS, SAMPLE_COLOR_DESIGNS } from './types';
import MixDesignManager from './components/MixDesignManager';
import ColorDesignManager from './components/ColorDesignManager';
import BatchCalculator from './components/BatchCalculator';
import VolumeCalculator from './components/VolumeCalculator';
import YardageCalculator from './components/YardageCalculator';
import JobsManager from './components/JobsManager';

type TabId = 'calculator' | 'designs' | 'colors' | 'volume' | 'yardage' | 'jobs';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'calculator', label: 'Batch Calculator' },
  { id: 'designs', label: 'Mix Designs' },
  { id: 'colors', label: 'Color Designs' },
  { id: 'volume', label: 'Volume Calculator' },
  { id: 'yardage', label: 'Yardage Calculator' },
  { id: 'jobs', label: 'Jobs' },
];

function App() {
  const [mixDesigns, setMixDesigns] = useState<MixDesign[]>([]);
  const [selectedMixId, setSelectedMixId] = useState<string>('');
  const [colorDesigns, setColorDesigns] = useState<ColorDesign[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>('calculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [calculatorInitialBatches, setCalculatorInitialBatches] = useState(1);
  const [calculatorResetSignal, setCalculatorResetSignal] = useState(0);

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

  // Load jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jobs');
    const parsedJobs = saved ? (JSON.parse(saved) as Job[]) : [];
    setJobs(parsedJobs);
  }, []);

  // Save jobs to localStorage
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

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

  const handleSaveJob = (jobName: string, batchCount: number) => {
    const selectedDesign = mixDesigns.find((d) => d.id === selectedMixId);
    if (!selectedDesign) {
      return;
    }

    const selectedColor = colorDesigns.find((d) => d.id === selectedColorId);

    const newJob: Job = {
      id: Date.now().toString(),
      name: jobName,
      mixDesignId: selectedDesign.id,
      mixDesignName: selectedDesign.name,
      colorDesignId: selectedColor?.id || '',
      colorDesignName: selectedColor?.name || '',
      batchCount,
      totalMass: selectedDesign.characteristics.mass * batchCount,
      totalVolume: selectedDesign.characteristics.volume * batchCount,
      materials: selectedDesign.materials.map((material) => ({
        name: material.name,
        quantityPerBatch: material.quantity,
        totalQuantity: material.quantity * batchCount,
        unit: material.unit,
      })),
      pigments: (selectedColor?.pigments || []).map((pigment) => ({
        name: pigment.name,
        quantityPerBatch: pigment.quantity,
        totalQuantity: pigment.quantity * batchCount,
        unit: pigment.unit,
      })),
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => [newJob, ...prev]);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handleLoadJob = (jobId: string) => {
    const job = jobs.find((item) => item.id === jobId);
    if (!job) {
      return;
    }

    const hasMix = mixDesigns.some((mix) => mix.id === job.mixDesignId);
    if (hasMix) {
      setSelectedMixId(job.mixDesignId);
    }

    const hasColor = colorDesigns.some((color) => color.id === job.colorDesignId);
    if (hasColor) {
      setSelectedColorId(job.colorDesignId);
    } else {
      setSelectedColorId('');
    }

    setCalculatorInitialBatches(job.batchCount);
    setCalculatorResetSignal((prev) => prev + 1);
    setActiveTab('calculator');
    setIsMenuOpen(false);
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
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
          type="button"
          className="hamburger-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="app-nav-list"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="hamburger-label">{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <div id="app-nav-list" className={`nav-tab-list ${isMenuOpen ? 'open' : ''}`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="app-content">
        {activeTab === 'calculator' && selectedDesign && (
          <BatchCalculator 
            mixDesign={selectedDesign} 
            mixDesigns={mixDesigns} 
            colorDesigns={colorDesigns}
            selectedMixId={selectedMixId}
            selectedColorId={selectedColorId}
            initialBatches={calculatorInitialBatches}
            resetSignal={calculatorResetSignal}
            onSelectMix={setSelectedMixId}
            onSelectColor={setSelectedColorId}
            onSaveJob={handleSaveJob}
            onOpenJobs={() => handleTabChange('jobs')}
          />
        )}
        {activeTab === 'calculator' && !selectedDesign && (
          <div className="card">
            <h3>No mix design selected</h3>
            <p>Create or select a mix design in the Mix Designs tab to use the Batch Calculator.</p>
          </div>
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
        {activeTab === 'volume' && <VolumeCalculator mixDesigns={mixDesigns} />}
        {activeTab === 'yardage' && <YardageCalculator />}
        {activeTab === 'jobs' && (
          <JobsManager jobs={jobs} onDelete={handleDeleteJob} onLoad={handleLoadJob} />
        )}
      </main>
    </div>
  );
}

export default App;
