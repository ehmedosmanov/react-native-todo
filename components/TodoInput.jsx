import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  TextInput,
  Button,
  Card,
  Title,
  IconButton,
  Provider as PaperProvider
} from 'react-native-paper'

const TodoInput = ({ taskInputHandler, todoValue, addTodoHandler }) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          value={todoValue}
          onChangeText={taskInputHandler}
          style={styles.inputStyle}
          placeholder='Your Tasks'
          mode='outlined'
        />
        <Button textColor='#fff' mode='contained' onPress={addTodoHandler}>
          Add Task
        </Button>
      </View>
    </>
  )
}

export default TodoInput

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  inputStyle: {
    flex: 1,
    marginRight: 10
  },
  tasksContainer: {
    flex: 1
  }
})
