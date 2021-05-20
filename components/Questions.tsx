import React, { useState, useEffect } from 'react'
import { state as stateTree, useSelector } from '../lib/state'
import { answersList, questionList } from '../lib/lists'
import { Form, Formik, Field } from 'formik'
import useSWR from 'swr'
import ClassInfo from './ClassInfo'

const fetcher = args => fetch(args).then(res => res.json())

const Questions = () => {
  const [state, setState] = useState([])
  const stateData = stateTree.data
  let an = 'a'

  var URL = `https://www.dnd5eapi.co/api/classes/${stateData.classInput}`

  const { data, error } = useSWR(URL, fetcher)

  useEffect(() => {
    return stateTree.onUpdate(update => setState(stateTree.active))
  }, [])

  if (stateData.raceInput === 'elf') an = 'an'

  const upperCase = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div className=" flex flex-col flex-grow text-sm md:text-base font-main px-4 py-3 rounded-lg border-2 border-solid border-gray-200">
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
            <p>{questionList[stateData.questionNumber]}</p>
            <Formik
              initialValues={{
                q: ''
              }}
              onSubmit={async (values, { resetForm }) => {
                await new Promise(r => setTimeout(r, 500))

                if (values.q == '') alert('Please choose an answer!')
                else stateTree.send('SUBMIT_QUESTION', values.q)

                // if (data.questionNumber === 6) stateTree.send('LAST_QUESTION')

                resetForm({})
              }}
            >
              {() => (
                <Form>
                  <div
                    className="space-x-4 py-10"
                    role="group"
                    aria-labelledby="q"
                  >
                    {answersList[stateData.questionNumber].map(
                      (answer, index) => (
                        <label key={index}>
                          <Field type="radio" name="q" value={answer} />
                          {answer}
                        </label>
                      )
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 py-2 px-3"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ),
        result: (
          <>
            <div className="pb-32">
              <p className="pb-10">
                Based on your answers, we think being {an}{' '}
                <span className="text-indigo-700">
                  {upperCase(stateData.raceInput)}
                </span>{' '}
                <span className="text-indigo-700">
                  {upperCase(stateData.classInput)}
                </span>{' '}
                would be super fun!
              </p>
              <p className="pb-10">
                We have put together the base stats and equipment for the{' '}
                <span className="text-indigo-700">
                  {upperCase(stateData.classInput)}
                </span>{' '}
                class:
              </p>
              {data ? (
                <div>
                  <div className="space-y-3">
                    <h2>
                      <span className="font-bold underline">Hit Die:</span>{' '}
                      {data.hit_die}
                    </h2>
                    <h2 className="font-bold underline">Saving Throws:</h2>
                    <ul className="list-inside list-decimal">
                      {data.saving_throws.map(name => {
                        return <li>{name.name}</li>
                      })}
                    </ul>
                    <h2 className="font-bold underline">Proficiencies:</h2>
                    <ul className="list-inside list-decimal">
                      {data.proficiencies.map(name => {
                        return <li>{name.name}</li>
                      })}
                    </ul>
                    <h2 className="font-bold underline">
                      Proficiency Choices:
                    </h2>
                    <ul className="list-inside list-decimal">
                      {data.proficiency_choices.map(name => {
                        return (
                          <div>
                            <p className="pb-2 font-bold">
                              Choose {name.choose} from:
                            </p>
                            <ul className="pb-4">
                              {name.from.map(from => {
                                return <li>{from.name}</li>
                              })}
                            </ul>
                          </div>
                        )
                      })}
                    </ul>
                    <h2 className="font-bold underline">Starting Equipment:</h2>
                    <ul className="list-inside list-decimal">
                      {data.starting_equipment.map(name => {
                        return (
                          <li>
                            {name.equipment.name} x{name.quantity}
                          </li>
                        )
                      })}
                    </ul>
                    {data.spellcasting && (
                      <div>
                        <h2 className="font-bold underline pb-4">
                          Spellcasting:
                        </h2>
                        <ul className="list-inside">
                          {data.spellcasting.info.map(name => {
                            return (
                              <li>
                                <p className="pb-2 font-bold">{name.name}</p>
                                <p className="pb-4">{name.desc} </p>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Questions
