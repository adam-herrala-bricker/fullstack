const dummy = (blogs) => {
    return(1)
  }

const totalLikes = (arr) => {
    const grandTotal = arr.reduce((accumulator, blog) => {
        const thisLikes = blog.likes
        return(accumulator + thisLikes)
    }, 0)

    return(grandTotal)

}

module.exports = {dummy, totalLikes}