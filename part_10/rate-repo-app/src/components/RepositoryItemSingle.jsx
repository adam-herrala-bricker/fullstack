//for the single view of repository items
import { Alert, Text, FlatList, View, Pressable, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery, useMutation } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'
import { openURL } from 'expo-linking'
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

    containerButton: {
        flexDirection: 'row',
        padding: 3
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
    },

    textButton: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textWhite

    },

    button: {
        padding: 6,
        margin: 3,

        flex: 1,
        alignItems: 'center',

        borderRadius: theme.radii.subtleRadius
    },

    buttonView: {
        backgroundColor: theme.colors.backgroundSecondary
    },
    buttonDelete: {
        backgroundColor: theme.colors.error
    }
})

const ReviewButtons = ({review, refetch}) => {
    const url = review.repository.url
    const repositoryName = review.repository.name
    const reviewID = review.id
    const [deleteReviewByID] = useMutation(DELETE_REVIEW)
     
    //event handlers
    const handleView = () => {
        openURL(url)
    }

    const deletails = async () => {
        console.log(reviewID)
        await deleteReviewByID({variables: {deleteReviewID: reviewID}})
        refetch()
    }

    const handleDelete = async () => {
        Alert.alert(
            'Delete review', 
            `Are you sure that you want to delete your review for ${repositoryName}?`,
            [
                {text: 'delete', onPress: () => deletails()},
                {text: 'cancel', onPress: () => console.log('deleted!')}
            ])
    }
    
        return (
            <View style = {styles.containerButton}>
                <Pressable style = {[styles.button, styles.buttonView]}onPress = {handleView}>
                    <Text style = {styles.textButton}>View on GitHub</Text>
                </Pressable>
                <Pressable style = {[styles.button, styles.buttonDelete]} onPress = {handleDelete}>
                    <Text style = {styles.textButton}>Delete review</Text>
                </Pressable>
            </View>
        )
}

export const ReviewItem = ({ review, isSingleView, refetch }) => {

    return(
        <View>
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
                            {isSingleView? review.user.username : review.repositoryId}
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
            {!isSingleView && <ReviewButtons review = {review} refetch = {refetch} />}
    </View>

        
    )
}

const RepositoryItemSingle = () => {
    const { id } = useParams()
    console.log('id', id)
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

    return (
        <View style = {styles.containerSuperParent}>
            <RepositoryItem item = {data.repository} isSingle = {true}/>
            <FlatList
                data = {reviewData}
                renderItem = {({ item }) => <ReviewItem review = {item} isSingleView = {true}/>}
                keyExtractor = {({ id }) => id} 
                style = {styles.containerOuter}
            />
        </View>
       
    )
}

export default RepositoryItemSingle