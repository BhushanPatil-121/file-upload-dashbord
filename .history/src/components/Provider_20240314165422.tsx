'use client';
import React, { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react';

interface ProviderProps{
    children:ReactNode;
}
const Provider:FC< = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Provider