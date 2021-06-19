import * as React from 'react'
import { Hero } from 'layouts/home/Hero'
import { Header } from 'layouts/home/Header'
import { Footer } from 'layouts/home/Footer'
import { Feature } from 'layouts/home/Feature'
import { Pricing } from 'layouts/home/Pricing'

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Pricing />
      <Footer />
    </>
  )
}
