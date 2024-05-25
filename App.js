import { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View, FlatList, Alert } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoItem from './components/TodoItem'
import TodoInput from './components/TodoInput'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [modalVisibleId, setModalVisibleId] = useState(null)

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    saveTodos()
  }, [todos])

  const loadTodos = async () => {
    try {
      const res = await AsyncStorage.getItem('todos')
      if (res) {
        setTodos(JSON.parse(res))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos))
    } catch (error) {
      console.log(error)
    }
  }

  function taskInputHandler(enteredText) {
    setTodoValue(enteredText)
  }

  function editInputHandler(enteredText) {
    setEditValue(enteredText)
  }

  function addTodoHandler() {
    if (todoValue.trim().length === 0) {
      alert('Please enter a valid task.')
      return
    }
    setTodos(prevTodos => [
      ...prevTodos,
      { todo: todoValue, id: Date.now().toString() }
    ])
    setTodoValue('')
  }

  function removeTodoHandler(id) {
    Alert.alert('Do you want to remove', 'Are you sure you want to remove?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setTodos(prevTodos => prevTodos.filter(x => x.id !== id))
        },
        style: 'destructive'
      }
    ])
  }

  function startEdit(id, todoValue) {
    setEditId(id)
    setEditValue(todoValue)
  }

  function updateTodoHandle() {
    setTodos(prevTodos =>
      prevTodos.map(x => (x.id === editId ? { ...x, todo: editValue } : x))
    )
    setEditId(null)
    setEditValue('')
  }

  return (
    <PaperProvider>
      <StatusBar style='dark' />
      <View style={styles.appContainer}>
        <TodoInput
          addTodoHandler={addTodoHandler}
          taskInputHandler={taskInputHandler}
          todoValue={todoValue}
        />
        <View style={styles.tasksContainer}>
          {todos.length < 1 && (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('./assets/images/tasks.webp')}
              />
            </View>
          )}
          {/* <Text style={{ textAlign: 'center', paddingVertical: 20 }}>
            All Tasks...
          </Text> */}
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({ item }) => {
              return (
                <TodoItem
                  modalVisible={modalVisibleId === item.id}
                  setModalVisible={visible =>
                    setModalVisibleId(visible ? item.id : null)
                  }
                  removeTodoHandler={removeTodoHandler}
                  editId={editId}
                  startEdit={startEdit}
                  editInputHandler={editInputHandler}
                  editValue={editValue}
                  updateTodoHandle={updateTodoHandle}
                  {...item}
                />
              )
            }}
          />
        </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5'
  },
  tasksContainer: {
    paddingVertical: 15,
    marginBottom: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 100,
    margin: 'auto'
  },
  image: {
    width: 300,
    height: 300
  }
})
