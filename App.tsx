import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, View, Button, Image } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{ height: 80, width: 80 }} source={require('./assets/whale-lang-logo.png')} />
      <Text style={ styles.heading }>Whale Lang</Text>
      <CodeText />
      <StatusBar style="inverted" />
    </SafeAreaView>
  )
}


const CodeText = () => {
  const [codeText, onChangeCodeText] = React.useState(`
  program programa;
  let int x;

  main () {
    for (x = 0 to 10) {
      write(x);
    }
  }`)

  const [output, setOutput] = React.useState('Output:\n')

  async function handleButtonPress() {

    setOutput('')

    const url = 'http://7de941f7e5c2.ngrok.io/compile'

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
    height: '100%',
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
    height: '25%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 30,
  }
})
