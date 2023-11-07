import { View, Pressable, Text, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent'
    },

    buttonSelected: {
        backgroundColor: theme.colors.backgroundSecondary,

        borderRadius: theme.radii.standardRadius,
        borderColor: theme.colors.backgroundSecondary,
        borderWidth: 1,

        marginTop: 5,
        padding: 5
    },

    buttonUnselected: {
        backgroundColor: theme.colors.backgroudLight,

        borderRadius: theme.radii.standardRadius,
        borderColor: 'black',
        borderWidth: 1,

        marginTop: 5,
        padding: 5
    },

    textSelected: {
        color: theme.colors.textWhite
    },

    textUnselected: {
        color: 'black'
    },

    textSort: {
        alignSelf: 'center',
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading
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
        <Text style = {styles.textSort}>sort</Text>
        <OrderingElement displayText = 'added' highlight = {isHighlighted('CREATED_AT')} handleSelect = {() => setOrdering({...ordering, orderBy: 'CREATED_AT'})}/>
        <OrderingElement displayText = 'rating' highlight = {isHighlighted('RATING_AVERAGE')} handleSelect = {() => setOrdering({...ordering, orderBy: 'RATING_AVERAGE'})}/>
        <OrderingElement displayText = 'ascending' highlight = {isHighlighted('ASC')}handleSelect = {() => setOrdering({...ordering, orderDirection: 'ASC'})}/>
        <OrderingElement displayText = 'descending' highlight = {isHighlighted('DESC')} handleSelect = {() => setOrdering({...ordering, orderDirection: 'DESC'})}/>
    </View>
    )
  }

  export default SelectOrdering