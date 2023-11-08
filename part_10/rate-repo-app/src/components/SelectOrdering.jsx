import { View, Pressable, Text, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent'
    },

    buttonSelected: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: theme.colors.backgroundSecondary,

        borderRadius: theme.radii.standardRadius,
        borderColor: theme.colors.backgroundSecondary,
        borderWidth: 1,

        margin: 4,
        padding: 4
    },

    buttonUnselected: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: theme.colors.backgroupWhite,

        borderRadius: theme.radii.standardRadius,
        borderColor: theme.colors.backgroudLight,
        borderWidth: 1,

        margin: 4,
        padding: 4
    },

    textSelected: {
        color: theme.colors.textWhite,
        fontWeight: theme.fontWeights.bold
    },

    textUnselected: {
        color: theme.colors.backgroundSecondary,
        fontWeight: theme.fontWeights.bold
    }

})

//component for single ordering element
const OrderingElement = ({displayText, handleSelect, highlight}) => {
    
      return(
        <Pressable style = {highlight ? styles.buttonSelected : styles.buttonUnselected} onPress = {handleSelect}>
            <Text style = {highlight ? styles.textSelected: styles.textUnselected}>
                {displayText}
            </Text>
        </Pressable>

    )
}

//component for selecting ordering (with BUTTONS)
const SelectOrdering = ({ ordering, setOrdering }) => {
    //helper function for evaluating whether it's highlighted
    const isHighlighted = (entry) => {
        return ordering.orderBy === entry | ordering.orderDirection === entry
    }
   
    return(
      <View style = {styles.mainContainer}>
        <OrderingElement displayText = 'added' highlight = {isHighlighted('CREATED_AT')} handleSelect = {() => setOrdering({...ordering, orderBy: 'CREATED_AT'})}/>
        <OrderingElement displayText = 'rating' highlight = {isHighlighted('RATING_AVERAGE')} handleSelect = {() => setOrdering({...ordering, orderBy: 'RATING_AVERAGE'})}/>
        <OrderingElement displayText = 'lowest' highlight = {isHighlighted('ASC')}handleSelect = {() => setOrdering({...ordering, orderDirection: 'ASC'})}/>
        <OrderingElement displayText = 'highest' highlight = {isHighlighted('DESC')} handleSelect = {() => setOrdering({...ordering, orderDirection: 'DESC'})}/>
    </View>
    )
  }

  export default SelectOrdering