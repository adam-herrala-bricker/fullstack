import { StyleSheet, View } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import Signin from './SignIn'
import RepositoryItemSingle from './RepositoryItemSingle';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  }
});

//note the last route re-directs to '/' if the path isn't defined
const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path = '/' element = {<RepositoryList />}/>
        <Route path = '/login' element = {<Signin />}/>
        <Route path = '/:id' element = {<RepositoryItemSingle />}/>
        <Route path = '*' element = {<Navigate to = '/' replace />}/>
      </Routes>
    </View>
  );
};

export default Main;