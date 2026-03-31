import { useState } from 'react';
import { Job } from '../types';
import './JobsManager.css';

interface Props {
  jobs: Job[];
  onDelete: (jobId: string) => void;
  onLoad: (jobId: string) => void;
}

export default function JobsManager({ jobs, onDelete, onLoad }: Props) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="jobs-manager">
      <div className="section">
        <h2 className="section-title">Jobs</h2>

        {jobs.length === 0 && (
          <div className="card jobs-empty-state">
            <h3>No jobs saved yet</h3>
            <p>Save a batch from the Batch Calculator to create your first job.</p>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="card-row">
            {jobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div key={job.id} className="card job-card">
                  <h3>{job.name}</h3>
                  <div className="job-summary">
                    <p>
                      <strong>Mix Design:</strong> {job.mixDesignName}
                    </p>
                    <p>
                      <strong>Batch Count:</strong> {job.batchCount}
                    </p>
                    <p>
                      <strong>Created:</strong> {formatDate(job.createdAt)}
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="job-details">
                      <p>
                        <strong>Color Design:</strong> {job.colorDesignName || 'None'}
                      </p>
                      <p>
                        <strong>Total Mass:</strong> {job.totalMass.toFixed(2)} lbs
                      </p>
                      <p>
                        <strong>Total Volume:</strong> {job.totalVolume.toFixed(2)} ft3
                      </p>

                      <h4>Materials</h4>
                      <ul>
                        {job.materials.map((material, idx) => (
                          <li key={`${job.id}-mat-${idx}`}>
                            {material.name}: {material.totalQuantity.toFixed(2)} {material.unit}
                          </li>
                        ))}
                      </ul>

                      {job.pigments.length > 0 && (
                        <>
                          <h4>Pigments</h4>
                          <ul>
                            {job.pigments.map((pigment, idx) => (
                              <li key={`${job.id}-pig-${idx}`}>
                                {pigment.name}: {pigment.totalQuantity.toFixed(2)} {pigment.unit}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}

                  <div className="job-actions">
                    <button
                      type="button"
                      className="btn-secondary btn-small"
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      type="button"
                      className="btn-primary btn-small"
                      onClick={() => onLoad(job.id)}
                    >
                      Load in Calculator
                    </button>
                    <button
                      type="button"
                      className="btn-danger btn-small"
                      onClick={() => onDelete(job.id)}
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}