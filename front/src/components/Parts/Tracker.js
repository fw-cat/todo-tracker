import React from 'react';
import { COLORS } from "../../constants/colors"

const Tracker = ({ tracker, checked }) => {
  const handleCheck = () => {
    if (!tracker.is_checked) {
      checked(tracker.id);
    }
  };

  return (
    <div
      className={`tracker color-0${tracker.color}`}
      role='button'
      tabIndex={0}
      onClick={handleCheck}
      onKeyDown={(e) => e.key === 'Enter' && handleCheck()}>

      <div className="card">
        <div className="interval">{tracker.interval_label}</div>

        <div className="card-header">
          <div className="toracker-days">{tracker.count} / {tracker.max_count}回</div>
        </div>
        <div className="card-body">
          <div className="tracker-icons">
            {[...Array(tracker.count)].map((_, index) => (
              <img
                key={index}
                src={COLORS[tracker._color.name]}
                alt={`on_${tracker._color.name}_${index + 1}`}
              />
            ))}
            {!tracker.is_checked && (
              <img src="./images/color-icon/colo-gray.svg" alt='today' />
            )}
          </div>
          <div className="tracker-label">{tracker.name}</div>
        </div>
      </div>

      <div className="achievement">
        <div
          className="filled"
          style={{
            width: `${tracker.achievement}%`,
          }}>
            <div className="label">{ tracker.achievement }%</div>
        </div>
        
      </div>
    </div>
  );
};

export default Tracker;
