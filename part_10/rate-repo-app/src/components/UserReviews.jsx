import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/queries'
import { ReviewItem } from './RepositoryItemSingle'

import theme from '../theme'

const styles = StyleSheet.create({
    separator: {
        height: 3,
        backgroundColor: theme.colors.backgroudLight
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const {data, loading} = useQuery(
        GET_ME,
        {
            variables: { includeReviews: true },
            fetchPolicy: 'cache-and-network'
        }
    )
        
    if (loading) {
        return null
    }

    const reviews = data.me.reviews.edges.map(edge => edge.node)
    return (
        <FlatList 
            data = {reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem = {({item}) => <ReviewItem review = {item} showUser = {false}/>}/>
        
    )
}

export default UserReviews