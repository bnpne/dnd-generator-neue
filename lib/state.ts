import { createState, createSelectorHook } from '@state-designer/react'

type DataProps = {
  answers: string[]
}

const initialData: DataProps = {
  answers: []
}

export const state = createState({
  data: initialData,
  initial: 'notAnswering',
  states: {
    notAnswering: {
      on: {
        BEGIN_ANSWERING: { to: 'answering' }
      }
    },
    answering: {
      on: {
        SUBMIT_QUESTION: 'submitQuestion'
      }
    }
  },
  actions: {
    submitQuestion(d, p) {
      d.answers.push(p)

      console.log(d.answers)
    }
  }
})

export const useSelector = createSelectorHook(state)
