import { StyleSheet, Pressable, Image, View, Text } from 'react-native';
import { openURL } from 'expo-linking'; //for opening urls in another app
import { shortenInteger } from '../utils/helperFunctions';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        margin: 7,
        borderRadius: theme.radii.standardRadius,
        backgroundColor: theme.colors.backgroupWhite
    },

    flexContainerRow: {
        flexDirection: 'row'
    },

    flexContainerColumn: {
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginLeft: 10,
        flex: 1
    },

    flexStretch: {
        justifyContent: 'space-around'
    },

    centerItem: {
        alignSelf: 'center',
        marginBottom: 4
    },

    containerLanguage: {
        margin: 10,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.radii.subtleRadius
    },

    containerLink: {
        margin: 10,
        flexGrow: 1,
        backgroundColor: theme.colors.backgroundDark,
        borderRadius: theme.radii.subtleRadius
    },

    nameText: {
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary,
        marginBottom: 3
    },

    descriptionText: {
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSizes.small,
        fontWeight: theme.fontWeights.thin
    },

    languageText: {
        alignSelf: 'center',
        padding: 6,
        fontFamily: theme.fontFamily,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },

    statText: {
        fontFamily: theme.fontFamily,
        fontWeight: theme.fontWeights.bold,
    },

    tinyLogo: {
        width: 60,
        height: 60,
        borderRadius: theme.radii.standardRadius
      }
});

const Header = ({item}) => {
    return(
        <View style = {styles.flexContainerRow}>
            <Image style = {styles.tinyLogo} source = {{uri: item.ownerAvatarUrl}}/>
            <View style = {styles.flexContainerColumn}>
                <View>
                    <Text style = {styles.nameText}>
                        {item.fullName}
                    </Text>
                </View>
                <View>
                    <Text style = {styles.descriptionText}>
                        {item.description}
                    </Text>
                </View> 
            </View>
        </View>
    );
};

const LanguageButton = ({language}) => {
    return (
        <View style = {styles.containerLanguage}>
            <Text style = {styles.languageText}>
                {language}
            </Text>
        </View>
    ); 
};

const ItemStats = ({entry, label}) => {
   
    return(
        <View>
            <View style = {styles.centerItem}>
                <Text style = {styles.statText}>
                    {shortenInteger(entry)}
                </Text>
            </View>
            <View style = {styles.centerItem}>
                <Text>
                    {label} 
                </Text>
            </View>
        </View>
    )
}

const ItemLink = ({url}) => {
    //event handler
    const handlePress = () => {
        openURL(url)
    }

    return(
        <Pressable onPress = {handlePress} style = {styles.containerLink}>
            <Text style = {styles.languageText}>
                Open in GitHub
            </Text>
        </Pressable>
    )
}

//isSingle tracks whether this is the "single view" --> shows the url link
const RepositoryItem = ({ item, isSingle }) => {

    return(
        <View style = {styles.container} testID = 'repositoryItem'>
            <Header item = {item} />
            <View style = {styles.flexContainerRow}>
                <LanguageButton language = {item.language}/>
            </View>
            <View style = {[styles.flexContainerRow, styles.flexStretch]}>
                <ItemStats entry = {item.stargazersCount} label = 'Stars'/>
                <ItemStats entry = {item.forksCount} label = 'Forks'/>
                <ItemStats entry = {item.reviewCount} label = 'Reviews'/>
                <ItemStats entry = {item.ratingAverage} label = 'Rating'/>
            </View>
            <View style = {[styles.flexContainerRow, styles.flexStretch]}>
                {isSingle && <ItemLink url = {item.url}/>}
            </View>
        </View>
    )
};

export default RepositoryItem;