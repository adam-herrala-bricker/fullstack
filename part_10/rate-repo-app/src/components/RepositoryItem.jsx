import { StyleSheet, Image, View, Text } from 'react-native';
import { shortenInteger } from '../utils/helperFunctions'
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        margin: 7,
        borderRadius: theme.radii.standardRadius,
        backgroundColor: theme.colors.backgroupWhite
    },

    flexContainerRow: {
        flexDirection: 'row',
    },

    flexContainerColumn: {
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginLeft: 10,
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
                <Text style = {styles.nameText}>
                    {item.fullName}
                </Text> 
                <Text style = {styles.descriptionText}>
                    {item.description}
                </Text>
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

const RepositoryItem = ({item}) => {
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
        </View>
    )
};

export default RepositoryItem;