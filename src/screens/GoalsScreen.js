import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';
import ModalForm from '../components/ModalForm';
import FormButton from '../components/FormButton';
import ListItem from '../components/ListItem';
import { addGoal, addGoalFailed, addGoalSuccess, deleteGoal, deleteGoalFailed, deleteGoalSuccess, editGoal, editGoalFailed, editGoalSuccess, fetchGoals, fetchGoalsFailed, fetchGoalsSuccess } from '../store/slices/goalSlice';
import { goalsReducer, initialState } from '../store/reducers/goalsReducer'; // Import reducer
import Config from 'react-native-config';
import { useAddGoalMutation, useLazyGetGoalsQuery, useEditGoalMutation, useDeleteGoalMutation } from '../services/rtkQuery/goalsAPISlice';

const GoalsScreen = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goal);
  const [state, localDispatch] = useReducer(goalsReducer, initialState);
  const [rtkAddGoal, { error }] = useAddGoalMutation();
  const [rtkGetGoal, { isLoading }] = useLazyGetGoalsQuery();
  const [rtkEditGoal] = useEditGoalMutation();
  const [rtkDeleteGoal] = useDeleteGoalMutation();

  const handleAddGoal = async () => {
    if (Config.ENV === 'Staging') {
      console.log('attempting add goal using RTK query')
      try {
        const result = await rtkAddGoal(state.goalInput).unwrap();
        console.log('add goal success:', result);
        dispatch(addGoalSuccess(result.createdGoal))
        localDispatch({ type: 'CLOSE_ADD_MODAL' });
      } catch (error){
        console.error('RTK Query add goal Error:', error.message);
        dispatch(addGoalFailed(error.message))
      }
    } else if(Config.ENV === 'Development'){
      try{
        console.log('attempting add goal using redux-saga with axios')
        dispatch(addGoal(state.goalInput));
        localDispatch({ type: 'CLOSE_ADD_MODAL' });
      }catch(error){
        console.error('Redux-saga with add goal Error:', error.data.message);
      }
    }
  };

  const handleShowGoals = async () => {
    if (Config.ENV === 'Staging') {
      console.log('attempting show goal using RTK query')
      try {
        const result = await rtkGetGoal();
        console.log('show goal success:', result.data.message);
        dispatch(fetchGoalsSuccess(result.data.data))
      } catch (error) {
        console.error('RTK Query show goal Error:', error.message);
        dispatch(fetchGoalsFailed(error.message))
      }
    } else if(Config.ENV === 'Development'){
      try{
        console.log('attempting show goals using redux-saga with axios')
        dispatch(fetchGoals())
      }catch(error){
        console.error('Redux-saga with axios show goals Error:', error.data.message);
      }
    }
  }

  const handleEditGoal = async () => {
    if (Config.ENV === 'Staging') {
      console.log('attempting edit goal using RTK query')
      try {
        const result = await rtkEditGoal({ id: state.editId, title: state.editTitle }).unwrap();
        console.log('edit goal success:', result);
        dispatch(editGoalSuccess(result.updatedGoal))
        localDispatch({ type: 'CLOSE_EDIT_MODAL' });
      } catch (error){
        console.error('RTK Query edit goal Error:', error.message);
        dispatch(editGoalFailed(error.message))
      }
    } else if(Config.ENV === 'Development'){
      try{
        console.log('attempting edit goal using redux-saga with axios')
        dispatch(editGoal({ id: state.editId, title: state.editTitle }));
        localDispatch({ type: 'CLOSE_EDIT_MODAL' });
      }catch(error){
        console.error('Redux-saga with edit goal Error:', error.data.message);
      }
    }
  };

  const handleDeleteGoals = async (id) => {
    if (Config.ENV === 'Staging') {
      console.log('attempting delete goal using RTK query')
      try {
        const result = await rtkDeleteGoal(id);
        console.log('delete goal success:', result);
        dispatch(deleteGoalSuccess(result.data.deletedGoal))
      } catch (error) {
        console.error('RTK Query delete goal Error:', error.message);
        dispatch(deleteGoalFailed(error.message))
      }
    } else if(Config.ENV === 'Development'){
      try{
        console.log('attempting delete goals using redux-saga with axios')
        dispatch(deleteGoal(id))
      }catch(error){
        console.error('Redux-saga with axios delete goals Error:', error.data.message);
      }
    }
  }


  const renderGoals = ({ item }) => (
    <ListItem
      id={item._id}
      title={item.title}
      createDt={item.createdAt}
      updateDt={item.updatedAt}
      onEdit={() => localDispatch({ type: 'OPEN_EDIT_MODAL', payload: { id: item._id, title: item.title } })}
      onDelete={() => handleDeleteGoals(item._id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <TextDisplay txt={'Goals Screen'} />
        <FormButton title={'Add goal'} onPress={() => localDispatch({ type: 'OPEN_ADD_MODAL' })} />
        <FormButton title={'Show goals'} onPress={handleShowGoals} />
        
        {/* Add Goal Modal */}
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_GOAL_INPUT', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_ADD_MODAL' })}
          onSubmit={handleAddGoal}
          title={'Add Goal'}
          placeholder={'Write a goal'}
          modalVisible={state.isAddModalOpen}
        />

        <View style={styles.bodyContainer}>
          <FlatList
            data={goals}
            keyExtractor={(item) => item._id}
            renderItem={renderGoals}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        {/* Edit Goal Modal */}
        <ModalForm
          onChange={(text) => localDispatch({ type: 'SET_EDIT_TITLE', payload: text })}
          onClose={() => localDispatch({ type: 'CLOSE_EDIT_MODAL' })}
          onSubmit={handleEditGoal}
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

export default GoalsScreen;
