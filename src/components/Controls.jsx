import React from 'react'

const Controls = ({ isCaller, startCall, incomingCall, acceptCall, hangUp }) => {
  return (
    <div style={{ marginTop: 20 }}>
      {isCaller && <button onClick={startCall}>📞 Call</button>}
      {incomingCall && (
        <div>
          <p>📲 Incoming Call</p>
          <button onClick={acceptCall}>✅ Accept</button>
        </div>
      )}
      <button onClick={hangUp}>❌ Hang Up</button>
    </div>
  )
}

export default Controls


  
  