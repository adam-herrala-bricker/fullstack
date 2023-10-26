import { FlatList, View, Text } from 'react-native';

const repo = [{
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  }]

const RepositoryItem = ({item}) => {
    return(
        <View>
            <Text>
                Full name: {item.fullName}
            </Text>
            <Text>
                Description: {item.description}
            </Text>
            <Text>
                Language: {item.language}
            </Text>
            <Text>
                Stars: {item.stargazersCount}
            </Text>
            <Text>
                Forks: {item.forksCount}
            </Text>
            <Text>
                Reviews: {item.reviewCount}
            </Text>
            <Text>
                Rating: {item.ratingAverage}
            </Text>
        </View>
    )
}

export default RepositoryItem;