import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, View, Button, Alert } from 'react-native';

export default function App() {

  function handleButtonPress() {
    Alert.alert('Button with adjusted color pressed')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={ styles.heading }>Compilords!</Text>
      <CodeText />
      <View style={ { marginTop: 20  } }>
        <Button
          title='RUN CODE!'
          onPress={ handleButtonPress }
        />
      </View>
      <StatusBar style="inverted" />
    </SafeAreaView>
  )
}


const CodeText = () => {
  const [value, onChangeText] = React.useState(`
  Program program;

  main () {
  
  }`)

  return (
    <TextInput
      textAlignVertical='top'
      multiline
      numberOfLines={40}
      style={ styles.inputStyle }
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginBottom: 35,
    color: 'white',
  },
  white: {
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'white',
    width: '80%',
    height: '60%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 30,
  }
})
