//for the single view of repository items
import { Text, FlatList, View, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'

const styles = StyleSheet.create({
    //needed so that the flat list scrolls to the bottom
    containerSuperParent: {
        flex:1
    },

    containerOuter: {
        backgroundColor: theme.colors.backgroudLight,
    },

    containerMain: {
        flexDirection: 'row',
        marginTop: 5,
        padding: 5,

        backgroundColor: theme.colors.backgroupWhite,
    },

    containerRating: {
        padding: 5,
        
    },

    containerBody: {
        padding: 5,
        flex: 1
    },

    containerCircle: {
        //formula for a circle: height = width + border radius = 1/2 of those
        height: 50,
        width: 50,

        justifyContent: 'center',
        alignItems: 'center',

        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 25,
        borderColor: theme.colors.textPrimary,
    },

    containerReviewText: {
        flexDirection: 'row',
        marginTop: 4
    },

    textRating: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
    },

    textUser: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold

    },

    textDate: {
        color: theme.colors.textLight
    },

    textReview: {
        flex: 1,
        flexWrap: 'wrap'
    }
})

const ReviewItem = ({ review }) => {

    return(
        <View style = {styles.containerMain}>
            <View style = {styles.containerRating}>
                <View style = {styles.containerCircle}>
                    <Text style = {styles.textRating}>
                        {review.rating}
                    </Text>
                </View>
                
            </View>
            <View style = {styles.containerBody}>
                <View>
                    <Text style = {styles.textUser}>
                        {review.user.username}
                    </Text>
                </View>
                <View>
                    <Text style = {styles.textDate}>
                        {review.createdAt.split('T')[0]}
                    </Text>
                </View>
                <View style = {styles.containerReviewText}>
                    <Text style = {styles.textReview}>
                        {review.text}
                    </Text>
                </View>
            </View>
        </View>
        
    )
}

const RepositoryItemSingle = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(
        GET_REPOSITORY, 
        {
            variables: { repositoryId: id },
            fetchPolicy: 'cache-and-network'
        })
    //console.log(data)
    
    if (loading) {
        return(
            <Text>
                loading . . .
            </Text>
        )
    }

    //data just for the review component
    const reviewData = data.repository.reviews.edges.map(i => i.node)
    //console.log(reviewData)

    return (
        <View style = {styles.containerSuperParent}>
            <RepositoryItem item = {data.repository} isSingle = {true}/>
            <FlatList
                data = {reviewData}
                renderItem = {({ item }) => <ReviewItem review = {item}/>}
                keyExtractor = {({ id }) => id} 
                style = {styles.containerOuter}
            />
        </View>
       
    )
}

export default RepositoryItemSingle