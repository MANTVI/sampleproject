import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/authSlice';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
      
    } catch (err) {
      return undefined;
    }
  };
  
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (err) {
      
      console.error('Could not save state', err);
    }
  };
  
  
  const persistedState = loadState();



const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    preloadedState: persistedState,
   
});
store.subscribe(() => {
    saveState(store.getState());
  });



export default store;
