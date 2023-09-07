import { useState } from 'react'

//custom hook for simplying fields in forms
export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        event.target.type === 'reset'
         ? setValue ('')
         : setValue(event.target.value)
    }


    return {
        name, 
        value, 
        onChange,
        autoComplete : 'off'
    }
}
