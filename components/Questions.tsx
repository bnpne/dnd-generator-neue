import React from 'react'
import { state, useSelector } from '../lib/state'

const Questions = () => {
  return (
    <div className="w-full h-48 text-sm md:text-base font-main px-4 py-3 rounded-lg border-2 border-solid border-gray-200">
      {/* Check State */}
      {state.isIn('notAnswering') ? (
        <>
          <div>
            <button className="bg-indigo-100 rounded-lg text-indigo-700">
              Get Started
            </button>
          </div>
        </>
      ) : (
        <>
          <div>not Hello</div>
        </>
      )}
    </div>
  )
}

export default Questions
