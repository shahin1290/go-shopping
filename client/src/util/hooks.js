import { useState } from 'react'

export const useForm = function (initial = {}) {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e) {
    let { value, name, type } = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'file') {
      // eslint-disable-next-line no-extra-semi
      ;[value] = e.target.files
    }
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  return {
    inputs,
    handleChange,
    resetForm
  }
}
