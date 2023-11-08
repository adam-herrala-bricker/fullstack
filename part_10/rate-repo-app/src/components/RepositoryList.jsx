import { useState } from 'react'
import { FlatList, Pressable, View, TextInput, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import SelectOrdering from './SelectOrdering'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroudLight
  },

  //need this to scroll all the way to the bottom
  superContainer: {
    flex: 1
  },

  separator: {
    height: 1,
  },

  searchBox : {
    margin: 8,
    padding: 10,

    borderRadius: theme.radii.subtleRadius,
    borderStyle: 'solid',
    borderWidth: 1,

    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fontFamily
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

//seperating out container for purely for testing purposes (efficient!)
export const RepositoryListContainer = ({ repositories, onEndReached }) => {
  const navigate = useNavigate()

  //need to get the "nodes" from the "edges" array
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  //event handler
  const handlePress = (itemID) => {
    navigate(`/${itemID}`)
    console.log(`/${itemID}`)
  }
  

  return (
    <FlatList
      style = {styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached = {onEndReached}
      onEndReachedThreshold = {.5}
      renderItem = {({item}) => 
        <Pressable onPress = {() => handlePress(item.id)}>
          <RepositoryItem item = {item} isSingle = {false}/>
        </Pressable>
      }
      keyExtractor = {item => item.id}
    />
  )
};

const RepositoryList = () => {
  const defaultOrdering = {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
  const [ordering, setOrdering] = useState(defaultOrdering)
  const [searchKeyword, setSearchKeyword] = useState('')
  //prevents over-querying the server as the user types (quite nifty)
  const [searchDebounce] = useDebounce(searchKeyword, 500)
  
  //this "side effect" would make testing harder
  const { repositories, fetchMore } = useRepositories({
    orderBy: ordering.orderBy,
    orderDirection: ordering.orderDirection,
    searchKeyword: searchDebounce,
    first: 5 //for pagination
  });

  //event handler
  const handleType = (value) => {
    setSearchKeyword(value)
  }

  const onEndReached = () => {
    //console.log('end reached!')
    fetchMore()
  }

  return (
    <View style = {styles.superContainer}>
      <TextInput placeholder = 'search' style = {styles.searchBox} value = {searchKeyword} onChangeText = {handleType}/>
      <SelectOrdering ordering = {ordering} setOrdering = { setOrdering }/>
      <RepositoryListContainer repositories = { repositories } onEndReached = { onEndReached}/>
    </View>
    
  );
};

export default RepositoryList;