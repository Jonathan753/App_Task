import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Modal, View, Alert, TextInput, useCallback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, BalsamiqSans_400Regular, BalsamiqSans_400Regular_Italic, BalsamiqSans_700Bold, BalsamiqSans_700Bold_Italic, } from '@expo-google-fonts/balsamiq-sans';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

//necessario instalação da font antes
export default function App() {
  const image = require('./resources/bg.jpg') //caminho da imagem

  console.disableYellowBox = true;

  const [tarefas, setarTarefas] = useState([]); //Array de tarefas usando o useState   

  const [modal, setModal] = useState(false);

  const [tarefaAtual, setTarefaAtual] = useState('');

  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic
  });
  //declarção das fonts

  useEffect(() => {
    (async () => {
      try {
        let tarefasAtual = await AsyncStorage.getItem('tarefas');
        if (tarefasAtual == null)
          setarTarefas([]);
        else
          setarTarefas(JSON, parse(tarefasAtual));
      } catch (error) {

      }
    })();
  }, [])


  ////////////////////////////////////////////////
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  /////////////////////////////////////////////////////
  function deletarTarefa(id) {
    alert('Tarefa com id ' + id + ' foi deletada com sucesso!');
    let newTarefas = tarefas.filter(function (val) {
      return val.id != id;
    });
    setarTarefas(newTarefas);

    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
      } catch (error) {

      }
    })();

  }

  function addTarefa() {
    setModal(!modal);

    let id = 0;
    if (tarefas.length > 0) {
      id = tarefas[tarefas.length - 1].id + 1;
    }
    let tarefa = { id: id, tarefa: tarefaAtual };

    setarTarefas([...tarefas, tarefa]);

    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify([...tarefas, tarefa]));
      } catch (error) {

      }
    })();
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden style="light" />

      <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>
            <TouchableHighlight style={{ ...styles.openButton, backgroundColor: '#2196F3' }} onPress={() => addTarefa()}>
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Tarefas - Jonathan Érik</Text>
        </View>
      </ImageBackground>

      {
        tarefas.map(function (val) {
          return (<View style={styles.tarefaSingle}>
            <View style={{ flex: 1, width: '100%', padding: 10 }}>
              <Text>{val.tarefa}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
              <TouchableOpacity onPressIn={() => deletarTarefa(val.id)}>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>);
        })
      }

      <TouchableOpacity style={styles.btnAddTarefa} onPress={() => setModal(true)}><Text style={{ textAlign: 'center', color: 'white' }}>Adicionar Tarefa</Text></TouchableOpacity>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },

  btnAddTarefa: {
    width: 200,
    padding: 8,
    backgroundColor: 'gray',
    marginTop: 20
  },

  coverView: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  textHeader: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 40,
    fontFamily: 'BalsamiqSans_400Regular_Italic'
  },

  tarefaSingle: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    paddingBottom: 10
  },
  //Estilo para modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
