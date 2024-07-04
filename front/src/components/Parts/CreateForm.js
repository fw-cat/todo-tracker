import React, {useState} from 'react';
import {COLORS} from "../../constants/colors"

const CreateForm = ({ index, colors, intervals, handleChange }) => {
  // 入力値
  const [name, setName] = useState([]);
  const [color, setColor] = useState([]);
  const [interval, setInterval] = useState([]);

  const onChanges = (key, event) => {
    console.log(name, color, interval)
    handleChange(index, key, event.target.value)
  }

  return (
    <>
      <h4>登録トラッカー {index}</h4>
      <div>
        <label htmlFor={`name_${index}`}>トラッカー名</label>
        <input
          type="text"
          id={`name_${index}`}
          name="name"
          value={name}
          onChange={(e) => {
            onChanges("name", e);
            setName(e.target.value)
          }} />
      </div>
  
      <div>
        <label htmlFor='color'>トラッカー色</label>
        <div>
          {colors.map(color => {
            return (
              <div key={color.value}>
                <label htmlFor={`${color.name}_${index}`}>
                  <input
                    type="radio"
                    value={color.value}
                    id={`${color.name}_${index}`}
                    name="color"
                    onChange={(e) => {
                      onChanges("color", e)
                      setColor(e.target.value)
                    }} />
                  <img src={COLORS[color.name]} alt={color.name} />
                </label>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor={`interval_${index}`}>インターバル</label>
        <div>
          <select
            id={`interval_${index}`}
            name="interval"
            onChange={(e) => {
              onChanges("interval", e)
              setInterval(e.target.value)
            }}
          >
          {intervals.map(interval => {
            return (
              <option key={interval.value}>{interval.name}</option>
            )
          })}
          </select>
        </div>
      </div>
    </>
  );  
}
export default CreateForm;
