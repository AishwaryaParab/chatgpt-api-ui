import React from 'react'

const GPTResponse = ({ response }) => {
  const data = response.data;

  return (
    <div className="response">
        <p>{data}</p>
    </div>
  )
}

export default GPTResponse