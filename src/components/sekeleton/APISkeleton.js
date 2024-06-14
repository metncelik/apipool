import React from 'react';
import '../../styles/components/sekeleton/APISkeleton.css';

const APISkeleton = () => (
  <div className="api-skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-chips">
      <div className="skeleton-chip"></div>
      <div className="skeleton-chip"></div>
    </div>
    <div className="skeleton-description"></div>
    <div className="skeleton-description"></div>
    <div className="skeleton-sub-title"></div>
    <div className="skeleton-playground"></div>
  </div>
);

export default APISkeleton;