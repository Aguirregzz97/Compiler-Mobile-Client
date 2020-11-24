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

  const [output, setOutput] = React.useState('Output:\n')

  async function handleButtonPress() {

    const url = 'http://366ba31b363a.ngrok.io/compile'

    const response = await fetch(url, { 
      method: 'POST',
      body: JSON.stringify(codeText),
      headers: { 'content-type':  'application/json'}
    })
    const output = JSON.parse(await response.text())
    let res: string = ""
    for (let i = 0; i < output.length; i++) {
      res += output[i] + '\n'
    }
    setOutput(res)
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
