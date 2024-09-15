import React from 'react';
import { COLORS } from "../../constants/colors"

const EditForm = ({
  index,
  colors,
  tracker,
  handleChange,
  handleThisRemove
}) => {
  const onChanges = (key, event) => {
    const value = key === 'color' ? Number(event.target.value) : event.target.value;
    handleChange(index, key, value);
  };

  return (
    <div className="tracker">
      <span
        className="close"
        onClick={() => handleThisRemove(tracker.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleThisRemove(tracker.id)}>
        <img src="/images/icons/close_btn.svg" alt='close' />
      </span>
      <div className="tracker-colors">
        {colors.map(color => (
          <label
            key={`${color.value}_${index}`}
            htmlFor={`${color.name}_${index}`}>
            <input
              type="radio"
              value={color.value}
              id={`${color.name}_${index}`}
              name={`color_${index}`}
              checked={tracker.color === Number(color.value)}
              onChange={(e) => onChanges("color", e)}
            />
            <img src={COLORS[color.name]} alt={color.name} />
          </label>
        ))}
      </div>
      <div className="tracker-label">
        <input
          type="text"
          value={tracker.name}
          onChange={(e) => onChanges('name', e)}
        />
      </div>
    </div>
  );
}

export default EditForm;
