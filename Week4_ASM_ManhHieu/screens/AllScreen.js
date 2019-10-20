import React, { useState } from 'react';
import {
  Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ImageBackground,
  KeyboardAvoidingView, ScrollView
} from 'react-native';
import { TODOS } from '../utils/data.js';
const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};



export default function AllScreen(props) {
  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };
  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
    setTimeout(() => {
      props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 500);
  };

  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };
  return (
    <ImageBackground style={styles.container} source={{ uri: 'https://i.pinimg.com/originals/c2/52/3a/c2523ae7d9e43952fef424c82b6cf36f.jpg' }}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.keyboard}
      >
        <ScrollView>
          <View style={styles.container}>
            {todoList.map((todo, idx) => {
              return (
                <TodoItem
                  idx={idx}
                  todo={todo}
                  key={todo.body}
                  onToggleTodo={onToggleTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              );
            })}
            <View style={styles.inputContainer}>
              <TextInput
                value={todoBody}
                style={styles.todoInput}
                onChangeText={text => setTodoBody(text)}
              />
              <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: '95%',
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 15,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  }
});