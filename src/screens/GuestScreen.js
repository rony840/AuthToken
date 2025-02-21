import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';
import ModalForm from '../components/ModalForm';
import FormButton from '../components/FormButton';
import ListItem from '../components/ListItem';
import { addGoal, deleteGoal, editGoal, fetchGoals } from '../store/slices/goalSlice';
import { goalsReducer, initialState } from '../store/reducers/goalsReducer'; // Import reducer
import {disableGuest} from '../store/slices/userSlice';
const GuestScreen = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goal);
  const [state, localDispatch] = useReducer(goalsReducer, initialState);

  const handleAddGoal = () => {
    dispatch(addGoal(state.goalInput));
    localDispatch({ type: 'CLOSE_ADD_MODAL' });
  };

  const handleEditGoal = () => {
    dispatch(editGoal({ id: state.editId, title: state.editTitle }));
    localDispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  const handleBack = () => {
    dispatch(disableGuest());
  };

  const renderGoals = ({ item }) => (
    <ListItem
      id={item._id}
      title={item.title}
      createDt={item.createdAt}
      updateDt={item.updatedAt}
      onEdit={() => localDispatch({ type: 'OPEN_EDIT_MODAL', payload: { id: item._id, title: item.title } })}
      onDelete={() => dispatch(deleteGoal(item._id))}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <TextDisplay txt={'Guest Goals Screen'} />
        <FormButton title={'Add goal'} onPress={() => localDispatch({ type: 'OPEN_ADD_MODAL' })} />
        <FormButton title={'Show goals'} onPress={() => dispatch(fetchGoals())} />
        
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
        <FormButton title={'Back to login'} onPress={handleBack}/>
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

export default GuestScreen;
