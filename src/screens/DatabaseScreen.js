import { StyleSheet, SafeAreaView, View, FlatList, Alert } from 'react-native';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';
import ModalForm from '../components/ModalForm';
import FormButton from '../components/FormButton';
import { goalsReducer, initialState } from '../store/reducers/goalsReducer';
import { useReducer } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskListItem from '../components/TaskList';

const DatabaseScreen = () => {
  const [state, localDispatch] = useReducer(goalsReducer, initialState);
  const { fetchTasks, tasks, updateTaskName, addTask, updateTask, deleteTask } = useTaskStore();

  const showTasks = async () => {
    fetchTasks()
  }

  const handleAddTask = async (taskName) => {
    try{
      await addTask(taskName);
      Alert.alert('Task Added!',`"${taskName}" successfully added`)
      localDispatch({ type: 'CLOSE_ADD_MODAL' })
    }catch(error){
      console.log('failed to add task: ',error)
  } 
}
const handleEditTask = async () => {
  try{
    await updateTaskName(state.editId, state.editTitle);;
    Alert.alert('Task Edited!',`"${state.editTitle}" successfully edited`)
    localDispatch({ type: 'CLOSE_EDIT_MODAL' })
  }catch(error){
    console.log('failed to edit task: ',error)
  }
}

const renderTasks = ({ item }) => {
  console.log(item.id)
  return(<TaskListItem
    id={item.id}
    name={item.name}
    onEdit={(item) => localDispatch({ type: 'OPEN_EDIT_MODAL', payload: { id: item.id, title: item.name } })}
    onUpdate={(item)=> updateTask(item)}
    onDelete={(item) => deleteTask(item)}
    item={item}
    isCompleted={item.isCompleted}
  />)
}
  
 


  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <TextDisplay txt={'Database Screen'} />
        <FormButton title={'Add task'} onPress={() => localDispatch({ type: 'OPEN_ADD_MODAL' })} />
        <FormButton title={'Show tasks'} onPress={showTasks} />
        
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_GOAL_INPUT', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_ADD_MODAL' })}
          onSubmit={()=>{handleAddTask(state.goalInput)}}
          title={'Add Task'}
          placeholder={'Write a task'}
          modalVisible={state.isAddModalOpen}
        />

        <View style={styles.bodyContainer}>
          <FlatList
            data={tasks}
            keyExtractor={(item,index) => item?.id?.toString() || `task-${index}`}
            renderItem={renderTasks}
          />
        </View>
        {/* Edit task Modal */}
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_EDIT_TITLE', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_EDIT_MODAL' })}
          onSubmit={handleEditTask}
          title={'Edit Task'}
          placeholder={'Edit your task'}
          initValue={state.editTitle}
          modalVisible={state.isEditModalOpen}
        />

        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bodyContainer: {
    flex: 1,
    marginTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
});

export default DatabaseScreen;
