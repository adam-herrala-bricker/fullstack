import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroudLight
  },

  separator: {
    height: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  //need to get the "nodes" from the "edges" array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      style = {styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {({item}) => <RepositoryItem item = {item}/>}
      keyExtractor = {item => item.id}
    />
  );
};

export default RepositoryList;