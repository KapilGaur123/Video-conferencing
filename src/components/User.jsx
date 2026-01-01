import React from 'react'
import { useLoaderData } from 'react-router-dom'

const User = () => {
    const users = useLoaderData();
  return (
    <div>
      {
        users.map((u)=> (
            <div key={u.id}>
                <h2>{u.name}</h2>
            </div>
        ))
      }
    </div>
  )
}

export default User
