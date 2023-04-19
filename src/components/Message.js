import React from 'react';

export default function Message ({ data }) {
  return (
    <div style={{ fontSize: '20px' }}>
      <div>{data.sender.name}</div>
      <div style={{ display: 'flex' }}>
        <div className="text">{data.text}</div>
      </div>
    </div>
  )
}