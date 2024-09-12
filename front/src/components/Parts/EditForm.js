import React, {} from 'react';
import { COLORS } from "../../constants/colors"

const EditForm = ({
  index,
  colors,
  tracker,
  handleChange,
  handleThisRemove
}) => {
  // 入力値
  const onChanges = (key, event) => {
    let value = event.target.value
    if (key === 'color') {
      value = Number(value)
    }
    handleChange(index, key, value)
  }
  const thisRemove = () => {
    handleThisRemove(tracker.id)
  }

  return (
    <>
      <div className="tracker">
        <span
          className="close"
          onClick={thisRemove}
          role="button"
          tabIndex={0}
          onKeyDown={thisRemove}>
          <img src="/images/icons/close_btn.svg" alt='close' />
        </span>
        <div className="tracker-colors">
          {colors.map(color => {
            return (
              <label
                key={`${color.value}_${index}`}
                htmlFor={`${color.name}_${index}`} >
                <input
                  type="radio"
                  value={color.value}
                  id={`${color.name}_${index}`}
                  name={`color_${index}`}
                  checked={tracker.color === Number(color.value)}
                  onChange={(e) => onChanges("color", e)} />
                <img src={COLORS[color.name]} alt={color.name} />
              </label>
            )
          })}
        </div>
        <div className="tracker-label">
          <input
            type="text"
            value={tracker.name}
            onChange={(e) => onChanges('name', e)} />
        </div>
      </div>
    </>
  );
}
export default EditForm;
