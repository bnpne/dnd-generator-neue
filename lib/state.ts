import { createState, createSelectorHook } from '@state-designer/react'
import { processData } from './process'

type DataProps = {
  answers: string[]
  questionNumber: number
  raceInput: string
  classInput: string
}

const initialData: DataProps = {
  answers: [],
  questionNumber: 1,
  raceInput: null,
  classInput: null
}

export const state = createState({
  data: initialData,
  on: {
    GET_STARTED: { to: 'answering' }
  },
  initial: 'notAnswering',
  states: {
    notAnswering: {
      on: {
        GET_STARTED: { to: 'answering' }
      }
    },
    answering: {
      on: {
        SUBMIT_QUESTION: {
          if: 'lastQuestion',
          then: { do: 'submitQuestion', to: 'result' },
          else: {
            do: 'submitQuestion'
          }
        }
      }
    },
    result: {
      onEnter: ['processAnswers']
    }
  },
  conditions: {
    lastQuestion(d) {
      return d.questionNumber === 6
    }
  },
  actions: {
    submitQuestion(d, p) {
      d.answers.push(p)

      d.questionNumber < 7 ? d.questionNumber++ : (d.questionNumber = 1)
    },
    processAnswers(d) {
      const a = d.answers
      const chaData = processData(a[1], a[2], a[3], a[4], a[5], a[6], a[7])

      d.raceInput = chaData.userRace
      d.classInput = chaData.userClass
    }
  }
})

export const useSelector = createSelectorHook(state)
