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

const favoriteBlog = (arr) => {
    const topBlog = arr.length === 0 
    ? []
    : arr.sort((i,j) => {return(j.likes - i.likes)})[0] //comparison is via sign. look up the docs if you forget how this works. 
    return(topBlog) 
}

module.exports = {dummy, totalLikes, favoriteBlog}