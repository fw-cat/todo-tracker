import React from 'react';
import { COLORS } from "../../constants/colors"

const Tracker = ({ tracker, checked }) => {

  const thisChecked = () => {
    if (!tracker.is_checked) {
      checked(tracker.id)
    }
  }

  return (
    <>
      <div
        className="tracker"
        role='button'
        tabIndex={0}
        onClick={() => {thisChecked()}}
        onKeyDown={() => {thisChecked()}}>
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
    </>
  );
};

export default Tracker;
