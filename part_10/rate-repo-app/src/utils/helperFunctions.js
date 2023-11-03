 //for shortening integers over 1,000 to ...k (always returns string)
 export const shortenInteger = (integer) => {
    if (integer > 1000) {
        //note: doing two steps bc we still want the 10ths in the final string, and idk if js round can round to 10ths
        const divByHundo = integer/100
        const divByThou = Math.round(divByHundo)/10
        const stringOut = divByThou + 'k'

        return stringOut
    }

    return integer.toString()
}