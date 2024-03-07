import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import Header from './src/Components/Header';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const heightOfStatusBar = Constants.statusBarHeight;

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);

  const [tasks, setTasks] = useState ([
    {
      title: 'Do the dishes',
      id: 1
    },
    {
      title: 'write a book',
      id: 2
    },
    {
      title: 'eat',
      id: 3
    },
  ]);

  const [actuallyTask, setActuallyTask] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks == null){
          setTasks([]);
        } else {
          setTasks(JSON.parse(savedTasks));
        }
      } catch(e){
        console.log(e);
      }
    })();
  }, [])

  function deleteTask(taskToDelete) {
    var newTasks = tasks.filter(task => task.id !== taskToDelete.id);
    setTasks(newTasks);

    (async () => {
      try{
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      } catch(e){
        console.log(e);
      }
    })();
  };

  function addNewTask(){
    setModalVisible(!modalVisible);

    let id = 0;

    if (tasks.length > 0){
      id = tasks[tasks.length-1].id + 1;
    }

    const newTask = {id: id, title: actuallyTask};

    setTasks([...tasks, newTask]);

    (async () => {
      try{
        await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
      } catch(e){
        console.log(e);
      }
    })();
  }

    return (
      <View style={styles.container} key = "main">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal fechada');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.textInputTask} placeholder={'Ex: Estudar'}
              onChangeText={text => setActuallyTask(text)}
              ></TextInput>
              <TouchableOpacity
                style={styles.buttonCloseModal}
                onPress={() => addNewTask()}>
                <Text style={styles.textStyle}>Salvar Tarefa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Header/>
          <ScrollView>
          {
            tasks.map(function(task) {
              return (
                <View key={task.id} style={styles.containerTasks}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <Text style={styles.txtTasks}>{task.title}</Text>
                    <TouchableOpacity style={styles.btnTask} onPress={() => deleteTask(task)}>
                      <AntDesign name="minuscircleo" size={28} color="black"/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          }
          </ScrollView>
          <View style={styles.containerBtn}>
            <TouchableOpacity
            style={styles.btnAddTask} 
            onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textBtnAddTask}>+</Text>
            </TouchableOpacity>
          </View>
          
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1
  },
  containerTasks: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  txtTasks: {
    fontSize: 20,
    flex: 1,
  },
  btnTask: {
    alignItems: 'flex-end'
  },  
  btnAddTask: {
    //position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textBtnAddTask: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  containerBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    width: '80%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCloseModal: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
  },
  textInputTask: {
    borderWidth: 1,
    width: '80%',
    height: 40,
    padding: 5,
    marginBottom: 10,
    borderRadius: 15
  }
});
