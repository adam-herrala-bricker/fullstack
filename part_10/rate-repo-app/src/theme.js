import { Platform } from 'react-native';

const theme = {
    colors: {
        backgroundDark: '#000000',
        backgroudLight: '#D1D1D1',
        backgroupWhite: '#FFFFFF',
        backgroundSecondary: '#145366',
        backgroundBright: '#66DBFF',
        textWhite: '#FFFFFF',
        textPrimary: '#007598',
        textLight: '#57666D',
        error: '#d73a4a'
    },

    fontFamily: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
    }),

    fontSizes: {
        heading: 20,
        subheading: 18,
        small: 11
    },

    fontWeights: {
        bold: '700',
        thin: '300'
    },

    radii: {
        subtleRadius: 5,
        standardRadius: 10
    }
};

export default theme;