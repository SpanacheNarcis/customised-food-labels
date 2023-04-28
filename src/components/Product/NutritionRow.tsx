import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

const  NutritionRow = ({ information, valueFor100, measurementUnit, servingSize, customSize, odd = false, ofWhich = false}) => {

  const calcValue = (normalValue: number) => {
    const customValue = ((servingSize * normalValue)/100).toFixed(2);
    if(isNaN(parseInt(customValue))) {
      return '-'
    }
    return customValue
  }

  return (
      <View style={styles.row}>
        <Text style={[
          ofWhich ? styles.labelOfWhich: styles.label,
          odd ? styles.odd : styles.null
        ]}>
          {information}
        </Text>

        <Text 
          style={[
            styles.values_100g, 
            odd ? styles.odd : styles.null,
            servingSize ? styles.null : styles.fullWidth
          ]}>
            {valueFor100 ? valueFor100 : "-" } {measurementUnit}
        </Text>

        {servingSize && (
          <Text 
            style={[
              styles.values_serving,
              odd ? styles.odd : styles.null,
              customSize ? styles.fontBold : styles.null
            ]}>
            {calcValue(valueFor100)} {measurementUnit}
          </Text>
        )}
     </View>
  )
}

export default NutritionRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
    width: '40%',
    flex: 1,
    color: '#2F92A4',
    height: '100%',
    paddingTop: 4,
    paddingLeft: 4,
  },
  labelOfWhich: {
    fontSize: 12,
    width: '40%',
    alignSelf: 'center',
    color: '#2F92A4',
    opacity: 0.7,
    height: '100%',
    paddingTop: 5,
    paddingLeft: 4,
  },
  values_100g: {
    width: '30%',
    textAlign: 'right',
    borderColor: '#ccc',
    borderBottomWidth: 0,
    padding: 4
  },
  values_serving: {
    width: '30%',
    textAlign: 'right',
    borderColor: '#ccc',
    borderBottomWidth: 0,
    padding: 4,
  },
  odd: {
    backgroundColor: '#EDF5F4',
    height: '100%'
  },
  fontBold: {
    fontWeight: '700'
  },
  null: {},
  fullWidth: {
    width: '60%',
  }
});
