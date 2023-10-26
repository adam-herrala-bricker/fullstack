import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    backgroundColor: theme.colors.backgroundDark,
  },
  text: {
    color: theme.colors.textWhite,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Pressable>
        <Text style = {styles.text}>
            Repositories
        </Text>
    </Pressable>
</View>
  );
};

export default AppBar;