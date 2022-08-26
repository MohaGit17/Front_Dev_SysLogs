import React from 'react'


export const GlobalFilter = ({ filter, setFilter }) => {
    const styleb = {
        width: '10cm',
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: 'white',
        backgroundPosition: '10px 10px', 
        backgroundRepeat: 'no-repeat',
        padding: '12px 20px 12px 40px',
  }
  return (
    <span>
      Search:{' '}
      <input style={styleb} value={filter || ''} onChange={e => { setFilter(e.target.value);}}/>
    </span>
  )
}