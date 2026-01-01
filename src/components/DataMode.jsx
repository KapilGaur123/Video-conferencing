import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import User from './User'
import axios from 'axios'

async function userLoader(){
    const res = await axios.get("https://dummyjson.com/users");
    return res.json();
}

const router = createBrowserRouter([
    {
        path: "/user",
        element: <User/>,
        loader: userLoader
    }
])

const DataMode = () => {
  return <RouterProvider router={router} />
}

export default DataMode
