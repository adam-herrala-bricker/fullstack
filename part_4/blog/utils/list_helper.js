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

//WORKS FIRST TRY!!!!
const mostBlogs = (arr) => {
    //unique list of bloggers
    const bloggers = Array.from(new Set(arr.map(i => i.author)))
    //reduce over that list
    const bloggersByBlogs = bloggers.reduce((accumulator, blogger) => {
        //look at blogs by just the current blogger
        const theseBlogs = arr.filter(i => i.author === blogger)
        //reduce over that blogger's blogs to get the number
        const blogNumber = theseBlogs.reduce((accumulator, blog) => {
            return(accumulator + 1)
        }, 0)

        //new entry for list
        const newEntry = {author: blogger, blogs: blogNumber}

        //add entry to accumulator
        return(accumulator.concat(newEntry))

    }, [])

    //sort list by blog number (highest first) and return 0th entry from list
    return(bloggersByBlogs.sort((i,j) => {return(j.blogs - i.blogs)})[0])

}

//similar structure to mostBlogs
const mostLikes = (arr) => {
    const bloggers = Array.from(new Set(arr.map(i => i.author)))
    const bloggersByBlogs = bloggers.reduce((accumulator, blogger) => {
        const theseBlogs = arr.filter(i => i.author === blogger)
        const likeNumber = theseBlogs.reduce((accumulator, blog) => {
            return(accumulator + blog.likes) //key change is we're counting likes now
        }, 0)

        const newEntry = {author: blogger, likes: likeNumber}

        return(accumulator.concat(newEntry))

    }, [])

    return(bloggersByBlogs.sort((i,j) => {return(j.likes - i.likes)})[0])

}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}