import { Alert } from 'react-native';
import ClientAPI from './ClientAPI'; // Your axios instance

export const addGoal = async (title) => {
  try {
    console.log('add goal in userAPI: ', title);
    const response = await ClientAPI.post('/goals', { title });
    console.log('add goal response: ',response)
    Alert.alert(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Failed to add the goal:', error);
    throw error;
  }
};

export const getGoals = async () => {
    try {
      const response = await ClientAPI.get('/goals');
        console.log('getgoals response in userApi: ',response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch the goals:', error);
      throw error;
    }
  };

export const editGoal = async ( title, goalId ) => {
    try {
      const response = await ClientAPI.put('/goals', { title, goalId });
      return response.message;
    } catch (error) {
      console.error('edit goal failed:', error);
      throw error;
    }
  };

export const deleteGoal = async (goalId) => {
    try {
      const response = await ClientAPI.delete('/goals', { goalId });
      return response.message;
    } catch (error) {
        console.error('delete goal failed:', error);
        throw error;
    }
};