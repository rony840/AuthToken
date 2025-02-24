import { Alert } from 'react-native';
import ClientAPI from './ClientAPI'; // Your axios instance

export const addGoal = async (title) => {
  try {
    const response = await ClientAPI.post('/goals', { title });
    const goalData = response.data.createdGoal;
    Alert.alert(response.data.message);
    return goalData;
  } catch (error) {
    console.error('Failed to add the goal:', error);
    throw error;
  }
};

export const getGoals = async () => {
    try {
      const response = await ClientAPI.get('/goals');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch the goals:', error);
      throw error;
    }
  };

export const editGoal = async ( title, id ) => {
    try {
      const editedGoal = await ClientAPI.put(`/goals/${id}`, { title });
      Alert.alert(editedGoal.data.message);
      return editedGoal.data.updatedGoal;
    } catch (error) {
      console.error('edit goal failed:', error);
      throw error;
    }
  };

export const deleteGoal = async (id) => {
    try {
      const del = await ClientAPI.delete(`/goals/${id}`);
      Alert.alert(del.data.message);
      return del.data.deletedGoal;
    } catch (error) {
        console.error('delete goal failed:', error);
        throw error;
    }
};