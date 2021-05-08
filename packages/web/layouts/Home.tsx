import * as React from 'react'
import { Hero } from './home/Hero'
import { Header } from './home/Header'
import { Footer } from './home/Footer'
import { Feature } from './home/Feature'
import { Pricing } from './home/Pricing'
import { ColorToggle } from 'layouts/shared/ColorToggle'

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Pricing />
      <Footer />
      <ColorToggle />
    </>
  )
}
