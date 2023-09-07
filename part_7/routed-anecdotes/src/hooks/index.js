import { useState } from 'react'

//custom hook for simplying fields in forms
export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        name, 
        value, 
        onChange,
        autoComplete : 'off'
    }
}
