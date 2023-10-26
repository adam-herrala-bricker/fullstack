import { StyleSheet, Image, View, Text } from 'react-native';
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
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary,
        marginBottom: 3
    },

    descriptionText: {
        fontSize: theme.fontSizes.small,
        fontWeight: theme.fontWeights.thin
    },

    languageText: {
        padding: 6,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },

    statText: {
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
    //for shortening integers over 1,000 to ...k (always returns string)
    const shortenInteger = (integer) => {
        if (integer > 1000) {
            //note: doing two steps bc we still want the 10ths in the final string, and idk if js round can round to 10ths
            const divByHundo = integer/100
            const divByThou = Math.round(divByHundo)/10
            const stringOut = divByThou + 'k'

            return stringOut
        }

        return integer.toString()
    }
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
        <View style = {styles.container}>
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