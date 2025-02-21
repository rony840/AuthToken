export const initialState = {
    isAddModalOpen: false,
    isEditModalOpen: false,
    goalInput: '',
    editId: '',
    editTitle: '',
  };
  
  export const goalsReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_ADD_MODAL':
        return { ...state, isAddModalOpen: true, goalInput: '' };
      case 'CLOSE_ADD_MODAL':
        return { ...state, isAddModalOpen: false, goalInput: '' };
      case 'OPEN_EDIT_MODAL':
        return { ...state, isEditModalOpen: true, editId: action.payload.id, editTitle: action.payload.title };
      case 'CLOSE_EDIT_MODAL':
        return { ...state, isEditModalOpen: false, editId: '', editTitle: '' };
      case 'SET_GOAL_INPUT':
        return { ...state, goalInput: action.payload };
      case 'SET_EDIT_TITLE':
        return { ...state, editTitle: action.payload };
      default:
        return state;
    }
  };
  