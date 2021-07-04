import * as React from 'react'
import { Hero } from './Hero'
import { Header } from './Header'
import { Footer } from './Footer'
import { Feature } from './Feature'
import { Pricing } from './Pricing'
import { Research } from './Research'

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Pricing />
      <Research />
      <Footer />
    </>
  )
}
