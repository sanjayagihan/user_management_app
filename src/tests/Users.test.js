import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { setUsers } from '../redux/usersSlice';
import authReducer from '../redux/authSlice';

// Mock data
const initialUsers = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];

const newUser = { id: 3, firstName: 'Alice', lastName: 'Johnson' };
const updatedUser = { id: 1, firstName: 'Johnny', lastName: 'Doe' };

describe('Users Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: usersReducer,
        auth: authReducer,
      },
    });
  });

  it('should set initial users with setUsers action', () => {
    store.dispatch(setUsers(initialUsers));
    const state = store.getState().users;
    expect(state.users).toEqual(initialUsers);
  });

  it('should add a new user', () => {
    store.dispatch(setUsers(initialUsers));
    const currentState = store.getState().users;

    const updatedUsers = [...currentState.users, newUser];
    store.dispatch(setUsers(updatedUsers));

    const state = store.getState().users;
    expect(state.users).toContainEqual(newUser);
  });

  it('should update an existing user', () => {
    store.dispatch(setUsers(initialUsers));
    const currentState = store.getState().users;

    const updatedUsers = currentState.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    store.dispatch(setUsers(updatedUsers));

    const state = store.getState().users;
    expect(state.users).toContainEqual(updatedUser);
  });
});
