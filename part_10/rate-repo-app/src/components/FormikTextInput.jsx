//NOTE FOR FUTURE ADAM: All this formik stuff really seems to bloat the code out.
//Consider just using regular react when doing your own projects.

import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import theme from '../theme'

const styles = StyleSheet.create({
    errorText: {
    marginLeft: 10,
    color: theme.colors.error,
    },

    boxCommon: {
        margin: 8,
        padding: 10,

        borderRadius: theme.radii.subtleRadius,
        borderStyle: 'solid',
        borderWidth: 1,

        fontSize: theme.fontSizes.subheading
    },

    textBox: {
        borderColor: theme.colors.backgroundDark,
    },

    errorBox: {
        borderColor: theme.colors.error,
        
    }

});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style = {showError ? [styles.boxCommon, styles.errorBox] : [styles.boxCommon, styles.textBox]}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;