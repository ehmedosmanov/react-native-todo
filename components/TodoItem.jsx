import React from 'react'
import { StyleSheet, Pressable, View, Modal } from 'react-native'
import {
  TextInput,
  Button,
  Card,
  Title,
  IconButton,
  Text
} from 'react-native-paper'

const TodoItem = ({
  id,
  editId,
  editValue,
  editInputHandler,
  removeTodoHandler,
  startEdit,
  updateTodoHandle,
  todo,
  modalVisible,
  setModalVisible
}) => {
  console.log(modalVisible)
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <View key={id}>
          <Card style={styles.todoItem}>
            {editId === id ? (
              <Card.Content style={styles.todoContent}>
                <TextInput
                  value={editValue}
                  onChangeText={editInputHandler}
                  style={styles.inputStyle}
                  mode='outlined'
                />
                <Button onPress={updateTodoHandle} mode='contained'>
                  Save
                </Button>
              </Card.Content>
            ) : (
              <Card.Content style={styles.todoContent}>
                <Title style={styles.todoText}>{todo}</Title>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  }}>
                  <IconButton
                    icon='pencil'
                    size={20}
                    onPress={() => startEdit(id, todo)}
                  />
                  <IconButton
                    icon='delete'
                    size={20}
                    onPress={() => removeTodoHandler(id)}
                  />
                </View>
              </Card.Content>
            )}
          </Card>
        </View>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <Card style={styles.modalContainer}>
            <Card.Title title='Todo' />
            <Card.Content>
              <Text>{todo}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => setModalVisible(false)}
                mode='text'
                style={styles.button}>
                Cancel
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
  todoItem: {
    marginVertical: 5,
    elevation: 3
  },
  todoText: {
    fontSize: 18
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputStyle: {
    flex: 1,
    marginRight: 10
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(90, 34, 134, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  }
})
