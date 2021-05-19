import React from 'react'
import Head from 'next/head'

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="px-2 py-5 md:py-10 max-w-screen-lg mx-auto min-h-screen overflow-hidden">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
