import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, View, Button } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={ styles.heading }>Compilords!</Text>
      <CodeText />
      <StatusBar style="inverted" />
    </SafeAreaView>
  )
}


const CodeText = () => {
  const [codeText, onChangeCodeText] = React.useState(`
  Program program;

  main () {
  
  }`)

  const [output] = React.useState('Output:\n')

  async function handleButtonPress() {
    const response = await fetch('http://localhost:5000/run', { method: 'GET', body: codeText })
    console.log(response)
  }

  return (
    <>
      <TextInput
        textAlignVertical='top'
        multiline
        numberOfLines={40}
        style={ styles.inputStyle }
        onChangeText={text => onChangeCodeText(text)}
        value={codeText}
      />
      <TextInput
        textAlignVertical='top'
        multiline
        numberOfLines={40}
        style={ styles.outputStyle }
        value={output}
      />
      <View style={ { marginTop: 20  } }>
        <Button
          title='RUN CODE!'
          onPress={ handleButtonPress }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
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
    width: '85%',
    height: '40%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  outputStyle: {
    marginTop: 20,
    color: 'white',
    width: '85%',
    height: '30%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 30,
  }
})
