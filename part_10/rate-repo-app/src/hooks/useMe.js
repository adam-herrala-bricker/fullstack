import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/queries'

const useMe = (variables) => {
    const { data, loading, refetch, fetchMore } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables: variables
    })

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage

        if (!canFetchMore) {
            return null
        }

        fetchMore({
            variables: {
                after: data.me.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    }

    return {
        data: data,
        loading: loading,
        refetch: refetch,
        fetchMore: handleFetchMore,
    }
}

export default useMe