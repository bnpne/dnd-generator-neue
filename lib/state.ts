import { createState, createSelectorHook } from '@state-designer/react'

type DataProps = {
  answers: string[]
  questionNumber: number
}

const initialData: DataProps = {
  answers: [],
  questionNumber: 1
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
          to: 'result',
          else: { do: 'submitQuestion' }
        }
      }
    },
    result: {}
  },
  conditions: {
    lastQuestion(d) {
      return d.questionNumber === 6
    }
  },
  actions: {
    submitQuestion(d, p) {
      d.answers.push(p)

      d.questionNumber < 6 ? d.questionNumber++ : (d.questionNumber = 1)
    }
  }
})

export const useSelector = createSelectorHook(state)
