import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

interface UsersState {
    users: User[];
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    filteredUsers: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data: User[] = await response.json();
    return data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        filterName: (state, action: PayloadAction<string>) => {
            if (action.payload === '') {
                state.filteredUsers = state.users;
            } else {
                state.filteredUsers = state.users.filter(user =>
                    user.name.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
        },
        filterUsername: (state, action: PayloadAction<string>) => {
            if (action.payload === '') {
                state.filteredUsers = state.users;
            } else {
                state.filteredUsers = state.users.filter(user =>
                    user.username.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
        },
        filterEmail: (state, action: PayloadAction<string>) => {
            if (action.payload === '') {
                state.filteredUsers = state.users;
            } else {
                state.filteredUsers = state.users.filter(user =>
                    user.email.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
        },
        filterPhone: (state, action: PayloadAction<string>) => {
            if (action.payload === '') {
                state.filteredUsers = state.users;
            } else {
                state.filteredUsers = state.users.filter(user =>
                    user.phone.includes(action.payload)
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
            state.filteredUsers = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users';
        });
    },
});

export const { filterName, filterUsername, filterEmail, filterPhone } = usersSlice.actions;

export default usersSlice.reducer;

export const selectFilteredUsers = (state: RootState) => state.users.filteredUsers;
