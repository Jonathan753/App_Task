import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, BalsamiqSans_400Regular, BalsamiqSans_400Regular_Italic, BalsamiqSans_700Bold, BalsamiqSans_700Bold_Italic, } from '@expo-google-fonts/balsamiq-sans';
import { useState } from 'react';
//necessario instalação da font antes
export default function App() {
  const image = require('./resources/bg.jpg') //caminho da imagem

  const [tarefas, setarTarefas] = useState([
    {
      id: 1,
      tarefa: 'Minha tarefa 1.'
    },
    {
      id: 2,
      tarefa: 'Minha outra tarefa.'
    },
    {
      id: 3,
      tarefa: 'Minha outra tarefa.'
    }
  ]);

  let [fontsLoaded] = useFonts({ BalsamiqSans_400Regular, BalsamiqSans_400Regular_Italic, BalsamiqSans_700Bold, BalsamiqSans_700Bold_Italic, });
  //declarção das fonts
  if (!fontsLoaded) {
    return <AppLoading />; //forçar carregamendo da fonts
  }

  function deletarTarefa(id) {
    alert('Tarefa com id ' + id + ' foi deletada com sucesso!');
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden style="light" />
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
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
  }
});
