import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Picker } from '@react-native-community/picker';
import AssetExample from './components/AssetExample';
import Constants from 'expo-constants';
import convert from 'convert-units';

const measures = convert().measures();


const Measure = ({ measure, value,setValue }) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
 
  const [valueConvert, setValueConvert] = useState(0);

  useEffect(() => {
    setValueConvert(convert(+value).from(fromUnit).to(toUnit).toFixed(3));
  }, [value, fromUnit, toUnit]);

  return (
    <View style={{flex: 1,}}>
      <Text style={styles.titleText}>Values converter</Text>
      <View style={styles.pickerText}>
        <Picker
          style={styles.pickerBox}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}>
          {units.map((x, index) => (
            <Picker.Item label={x} value={x} key={index} />
          ))}
        </Picker>
        <View style={styles.pickerBox}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType={'numeric'}
          />
        </View>
      </View>
      
      <View style={styles.pickerText}>
        <Picker
          style={styles.pickerBox}
          selectedValue={toUnit}
          onValueChange={setToUnit}>
          {units.map((x, index) => (
            <Picker.Item label={x} value={x} key={index} />
          ))}
        </Picker>
        <View style={styles.pickerBox}>
          <Text style={[styles.input]}>{valueConvert}</Text>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(measures.map((m) => ({ key: 'length' })));
  const [value, setValue] = useState('0'); 

  const renderAll = ({ route }) => {

    return <Measure measure={route.key} value={value} setValue={setValue}/>;

  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}></Text>
      <TabView
      
        navigationState={{index, routes }}
        renderScene={renderAll}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}        
            style={styles.tab}
          />
        )}></TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'moccasin',
    padding: 12,
  },
  paragraph: {
    margin: 24,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
  },
  pickerText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBox: {
    flex: 1,
    marginHorizontal:5,
    padding: 6,
  },
  input: {
    flex:1,
    height: 40,
    borderColor: "mediumorchid",
    borderWidth: 1,
    fontSize: 16,
    justifyContent: "center",
    textAlign: 'center',
  },
  tab:{
    backgroundColor: "palegreen"
  }
});
