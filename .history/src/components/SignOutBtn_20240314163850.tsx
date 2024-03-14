"use client"
import React from 'react'
import { Button } from './ui/button'

export default function SignOutBtn() {
  return (
    <Button onClick={()=>signOut()}>Sign Out</Button>
  )
}
