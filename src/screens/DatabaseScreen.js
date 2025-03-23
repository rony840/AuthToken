import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';
import ModalForm from '../components/ModalForm';
import FormButton from '../components/FormButton';
import { goalsReducer, initialState } from '../store/reducers/goalsReducer';
import { database } from '../database/watermelonDB';
import { useReducer, useState } from 'react';
import ListItem from '../components/ListItem';

const DatabaseScreen = () => {
  const [state, localDispatch] = useReducer(goalsReducer, initialState);
  const [tasks, setTasks] = useState([])
  const showTasks = async () => {
    const taskList = await database.get("tasks").query().fetch();
    console.log("tasklist: ",taskList)
    setTasks(taskList)
  }
  console.log(tasks);

  const handleAddTask = async (taskName) => {
    try{
      console.log('attempting to add: ',taskName)
      await database.write( async () => {
        console.log('inside writer')
        const newTask = await database.get('tasks').create(task => {
          task.name = taskName
        })
        console.log('res: ',newTask)
    })
    localDispatch({ type: 'CLOSE_ADD_MODAL' })
    }catch(error){
      console.log('failed to add task: ',error)
    }
    
}

const renderTasks = ({ item }) => (
  <ListItem
    id={item._id}
    title={item.name}
    updateDt={item.isCompleted}
    onEdit={() => localDispatch({ type: 'OPEN_EDIT_MODAL', payload: { id: item._id, title: item.title } })}
    onDelete={() => {}}
  />
);
  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <TextDisplay txt={'Database Screen'} />
        <FormButton title={'Add task'} onPress={() => localDispatch({ type: 'OPEN_ADD_MODAL' })} />
        <FormButton title={'Show tasks'} onPress={showTasks} />
        
        {/* Add Task Modal */}
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_GOAL_INPUT', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_ADD_MODAL' })}
          onSubmit={()=>{handleAddTask(state.goalInput)}}
          title={'Add Goal'}
          placeholder={'Write a goal'}
          modalVisible={state.isAddModalOpen}
        />

        <View style={styles.bodyContainer}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item._id}
            renderItem={renderTasks}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        {/* Edit task Modal */}
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_EDIT_TITLE', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_EDIT_MODAL' })}
          onSubmit={()=>{}}
          title={'Edit Goal'}
          placeholder={'Edit your goal'}
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
