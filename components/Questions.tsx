import React, { useState, useEffect } from 'react'
import { state as stateTree, useSelector } from '../lib/state'
import { questionList } from '../lib/lists'

const Questions = () => {
  const [state, setState] = useState([])
  const { data } = stateTree

  useEffect(() => {
    return stateTree.onUpdate(update => setState(stateTree.active))
  }, [])

  return (
    <div className="w-full flex flex-col flex-grow h-48 text-sm md:text-base font-main px-4 py-3 rounded-lg border-2 border-solid border-gray-200">
      {/* Check State */}
      {stateTree.whenIn({
        notAnswering: (
          <>
            <div className="my-auto mx-auto">
              <button
                onClick={() => stateTree.send('GET_STARTED')}
                className="bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 py-2 px-3"
              >
                Get Started
              </button>
            </div>
          </>
        ),
        answering: (
          <>
            <div className="flex-grow">
              <p>{questionList[data.questionNumber]}</p>
              <div className=" space-x-4 " role="group" aria-labelledby="q7">
                {/* DO RADIO BUTTON */}
                <input
                  id="radio1"
                  type="radio"
                  name="radio"
                  className="hidden"
                  checked
                />
                <label
                  htmlFor="radio1"
                  className="flex items-center cursor-pointer text-xl"
                >
                  <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                  Best choice
                </label>
              </div>
            </div>
            <button
              onClick={() => stateTree.send('SUBMIT_QUESTION')}
              className="bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 py-2 px-3"
            >
              Submit
            </button>
          </>
        ),
        result: (
          <>
            <div>Result</div>
          </>
        )
      })}
    </div>
  )
}

export default Questions
