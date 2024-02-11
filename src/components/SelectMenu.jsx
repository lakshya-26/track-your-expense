import React from 'react'

const SelectMenu = ({label, id, name, value, onChange, defaultName, options, error}) => {
  return (
    <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className='border-b-2 rounded-md font-mono outline-none'
        >
            <option hidden className='font-mono'>{defaultName}</option>
            {
                options.map((option, i) => <option className='p-4 font-mono' key={i} value={option}>{option}</option>)
            }
        </select>
        <p className="error">{error}</p>
      </div>
  )
}

export default SelectMenu