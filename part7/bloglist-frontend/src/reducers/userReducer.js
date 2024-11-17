import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user'
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    setCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },
  },
});

export const { setUsers, setCurrentUser } = userSlice.actions;

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch(setUsers(users));
};

export const loginUser = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials);
  dispatch(setCurrentUser(user));
};

export default userSlice.reducer;
