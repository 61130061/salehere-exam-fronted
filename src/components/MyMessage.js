import React from 'react';


export default function MyMessage ({ data }) {
  return (
    <div className="my-text-container">
      <div>{data.sender}</div>
      <div style={{ display: 'flex' }}>
        <div className="my-text">{data.text}</div>
      </div>
    </div>
  )
}