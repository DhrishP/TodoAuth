"use client"
import React from 'react'
type Todocardprops ={
    email:string| null | undefined,
    username : string | null | undefined
}
const TodoCard = ({email,username}:Todocardprops) => {
  return (
    <div>{username}</div>
  )
}

export default TodoCard