"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export default function SignOutBtn() {
  return (
    <Button onClick={()=>signOut({ redirect:true, callbackUrl:`${window.location.origin}/` })}>Sign Out</Button>
  )
}
