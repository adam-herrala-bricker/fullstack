import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const queryResponse = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'})
    //console.log(queryResponse.data.repositories.edges)

    //return { repositories, loading, refetch: fetchRepositories };
    //note that this doesn't have a refetch function now, but unclear if it needs one?
    return { 
                repositories: queryResponse.data.repositories,
                loading: queryResponse.loading

            }
};

export default useRepositories;