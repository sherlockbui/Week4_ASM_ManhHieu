import React, { useState } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { TODOS } from '../utils/data.js';
const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  return (
    <View style={styles.container}>
      {props.todo.status === 'Active' ? <TouchableOpacity
        key={props.todo.body}
        style={[styles.todoItem, statusStyle]}
      >
        <Text style={styles.todoText}>
          {props.idx + 1}: {props.todo.body}
        </Text>

      </TouchableOpacity> : null}
    </View>

  );
};

export default function ActiveScreen(props) {
  const [todoList] = useState(TODOS);
  return (
    <ImageBackground style={styles.container} source={{ uri: 'https://i.pinimg.com/originals/c2/52/3a/c2523ae7d9e43952fef424c82b6cf36f.jpg' }}>
      <ScrollView >

        {todoList.map((todo, idx) => {
          return (
            <TodoItem
              idx={idx}
              todo={todo}
              key={todo.body}
            />
          );
        })}

      </ScrollView>
    </ImageBackground>
  );
}

ActiveScreen.navigationOptions = {
  title: 'Active'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
});