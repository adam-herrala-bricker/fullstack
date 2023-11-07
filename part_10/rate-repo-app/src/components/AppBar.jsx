import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    backgroundColor: theme.colors.backgroundDark,
  },
  text: {
    color: theme.colors.textWhite,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamily,
    marginRight: 15
  }
});

const BarItem = ({label, path}) => {
    return (
        <Pressable>
            <Link to = {path}>
                <Text style = {styles.text}>
                    {label}
                </Text>
            </Link>
        </Pressable>
    );
};

const SignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  
  //event handler
  const handleLogout = () => {
    //note: it seems quite important that the token is removed from local storage BEFORE the store is reset
    authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <Pressable onPress={handleLogout}>
      <Text style = {styles.text}>
        Log out
      </Text>
    </Pressable>
  )
}

const AppBar = () => {
  const response = useQuery(GET_ME, {fetchPolicy: 'cache-and-network'})
  const thisUser = response.data ? response.data.me : null
  console.log('this user: ', thisUser)

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <BarItem label = 'Repositories' path = '/' />
            {thisUser && <BarItem label = 'New Review' path = '/review'/>}
            {thisUser ? <SignOut /> : <BarItem label = 'Log in' path = '/login'/> }
        </ScrollView>
    </View>
  );
};

export default AppBar;