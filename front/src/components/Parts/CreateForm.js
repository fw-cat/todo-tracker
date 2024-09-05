import React, { useState } from 'react';
import { COLORS } from "../../constants/colors"

const CreateForm = ({
  index,
  colors,
  intervals,
  tracker,
  handleChange,
  handleThisRemove
}) => {
  // 入力値
  const [, setName] = useState([]);

  const onChanges = (key, event) => {
    handleChange(index, key, event.target.value)
  }
  const thisRemove = () => {
    handleThisRemove(tracker.id)
  }

  return (
    <>
      <section className="form-group">
        <span
          className="close"
          onClick={thisRemove}
          role="button"
          tabIndex={0}
          onKeyDown={thisRemove}>
          <img src="/images/create/close_btn.svg" alt='close' />
        </span>
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
              onChange={(e) => {
                onChanges("name", e);
                setName(e.target.value)
              }} />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor='color'>
            <img src="/images/create/label_palet@2x.png" alt='カラー' />
            カラー
          </label>
          <div className="select-area rows">
            {colors.map(color => {
              return (
                <label htmlFor={`${color.name}_${index}`} key={color.value}>
                  <input
                    type="radio"
                    value={color.value}
                    id={`${color.name}_${index}`}
                    name="color"
                    onChange={(e) => {
                      onChanges("color", e)
                    }} />
                  <img src={COLORS[color.name]} alt={color.name} />
                </label>
              )
            })}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor='interval'>
            <img src="/images/create/label_clock@2x.png" alt='目標' />
            目標
          </label>
          <div className="select-area columns">
            <label>
              <input type="radio" name="interval" />
              毎日
            </label>
            <label>
              <input type="radio" name="interval" />
              週
              <select
                id={`interval_${index}`}
                name="interval"
                onChange={(e) => {
                  onChanges("interval", e)
                }}
              >
                {intervals.map(interval => {
                  return (
                    <option key={interval.value}>{interval.name}</option>
                  )
                })}
              </select>
              回（月<span>4</span>回）
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
export default CreateForm;
