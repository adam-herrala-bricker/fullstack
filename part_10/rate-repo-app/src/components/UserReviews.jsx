import { FlatList, View, StyleSheet } from 'react-native'
import { ReviewItem } from './RepositoryItemSingle'
import useMe from '../hooks/useMe'

import theme from '../theme'

const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: theme.colors.backgroudLight
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const first = 5 //first is for pagination
    const {data, loading, refetch, fetchMore} = useMe({ includeReviews: true, first})

    //event handler
    const handleEndReached = () => {
        fetchMore()
    }
        
    if (loading) {
        return null
    }

    const reviews = data.me.reviews.edges.map(edge => edge.node)
    return (
        <FlatList 
            data = {reviews}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached = {handleEndReached}
            onEndReachedThreshold = { .5 }
            renderItem = {({item}) => <ReviewItem review = {item} refetch = {refetch} isSingleView = {false}/>}/>
        
    )
}

export default UserReviews