import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {

  const [todos, setTodos] = useState([
    { text: 'Complete To-do App', key: '1'},
    { text: 'Push it to Gitlab', key: '2'},
    { text: 'Present it to Vivek Sir', key: '3'}, 
  ]);


  const pressHandler = (key) => {
      setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.key != key);
      })
  }

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodos((prevTodos) => {
      return [
        {text : text, key: Math.random().toString()},
        ...prevTodos
      ];
    });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long',[
        { text : 'Understood', onPress : () => console.log('alert closed')}
      ]);
    }

    
  }

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss(); 
        console.log('Dismissed Keyboard')
      }}>
    <View style={styles.container}>
     <Header /> 
     <View style={styles.content}>
       <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList 
           data = {todos}
           renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler}/>
           )}
          />
        </View>
     </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  content: {
    padding: 40,
    flex:1, 
  },
  list: {
    marginTop: 30,
    flex:1,
  }
});
