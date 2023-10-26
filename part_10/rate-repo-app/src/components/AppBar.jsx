import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
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

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <BarItem label = 'Repositories' path = '/' />
            <BarItem label = 'Log in' path = '/login'/>
        </ScrollView>
    </View>
  );
};

export default AppBar;