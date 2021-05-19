import React from 'react'
import Layout from '../components/Layout'
import Questions from '../components/Questions'

const Index = () => {
  return (
    <div>
      <Layout title="DnD Character Generator">
        <div className="pb-10">
          <h1 className="py-4 font-bold text-xl md:text-2xl lg:text-3xl font-sans">
            DnD Character Generator
          </h1>
          <p className="text-sm md:text-base font-main px-4 py-3 bg-indigo-100 rounded-lg text-indigo-700">
            Easily generate a character for your next adventure! Simply fill out
            the questionnaire below. This lets us know which race and class we
            think will be the most fun to play.
          </p>
        </div>
        <Questions />
      </Layout>
    </div>
  )
}

export default Index
