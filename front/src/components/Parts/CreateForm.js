import React from 'react';
import { COLORS } from "../../constants/colors"

const CreateForm = ({
  index,
  colors,
  intervals,
  tracker,
  isRemove,
  handleChange,
  handleThisRemove
}) => {
  const onChanges = (key, event) => {
    handleChange(index, key, event.target.value);
  };

  const handleIntervalChange = (event) => {
    const { name, value } = event.target;
    document.getElementById(`${name}_weekly`).checked = true;
    handleChange(index, 'interval', value);
  };

  return (
    <section className="form-group">
      {isRemove && (
        <span
          className="close"
          onClick={() => handleThisRemove(tracker.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleThisRemove(tracker.id)}>
          <img src="/images/icons/close_btn.svg" alt='close' />
        </span>
      )}

      <div className="input-group">
        <label htmlFor={`name_${index}`}>
          <img src="/images/create/label_pen@2x.png" alt='項目名' />
          項目名
        </label>
        <div>
          <input
            type="text"
            id={`name_${index}`}
            name="name"
            value={tracker.name}
            onChange={(e) => onChanges("name", e)}
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor={`color_${index}`}>
          <img src="/images/create/label_palet@2x.png" alt='カラー' />
          カラー
        </label>
        <div className="select-area rows">
          {colors.map(color => (
            <label
              key={`${color.value}__${index}`}
              htmlFor={`${color.name}_${index}`}>
              <input
                type="radio"
                value={color.value}
                id={`${color.name}_${index}`}
                name={`color_${index}`}
                onChange={(e) => onChanges("color", e)}
              />
              <img src={COLORS[color.name]} alt={color.name} />
            </label>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor={`interval_${index}`}>
          <img src="/images/create/label_clock@2x.png" alt='目標' />
          目標
        </label>
        <div className="select-area columns">
          <label>
            <input
              type="radio"
              id={`interval_${index}_daily`}
              name={`interval_${index}`}
              value={intervals.daily.value}
              onChange={(e) => onChanges('interval', e)}
            />
            毎日
          </label>
          <label>
            <input
              type="radio"
              id={`interval_${index}_weekly`}
              name={`interval_${index}`}
              value={intervals['others'][0].value}
              onChange={(e) => onChanges('interval', e)}
            />
            週
            <select
              id={`interval_${index}`}
              name={`interval_${index}`}
              onChange={handleIntervalChange}
            >
              {intervals['others'].map(interval => (
                <option
                  key={`${interval.value}__${index}`}
                  value={interval.value}>
                  {interval.name}
                </option>
              ))}
            </select>
            回（月<span>4</span>回）
          </label>
        </div>
      </div>
    </section>
  );
}

export default CreateForm;
