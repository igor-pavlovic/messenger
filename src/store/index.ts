import { Friend, Message } from '@/types'
import {configureStore, createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Chats {
  [friendId: string]: Message[];
}

export interface MessengerState {
  friends: Friend[];
  chats: Chats;
  selectedFriendId: string | null;
}

const initialState: MessengerState = {
  friends: [],
  chats: {},
  selectedFriendId: null
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,

  // Using Redux Toolkit's immer for immutable updates
  reducers: {
    setChats: (state, action: PayloadAction<Chats>) => {
      state.chats = action.payload;
    },
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    selectFriend: (state, action: PayloadAction<string>) => {
      state.selectedFriendId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message & { friendId: string }>) => {
      const { friendId, ...message } = action.payload;

      // My assumption: only adding messages if the author was added as a friend
      if (state.chats[friendId]) {
        state.chats[friendId].push(message);
      }
    },
    addFriend: (state, action: PayloadAction<Friend>) => {
      const newFriend = action.payload;

      // Avoid duplicates
      const exists = state.friends.some(friend => friend.id === newFriend.id);

      if (!exists) {
        state.friends.push(newFriend);
        state.chats[newFriend.id] = [];
      }
    }
  }
});

export const {
  selectFriend,
  setChats,
  setFriends,
  addMessage,
  addFriend,
} = messengerSlice.actions;

const THUNKS = {
  getFriends: 'messenger/getFriends',
  getChats: 'messenger/getChats',
  sendMessage: 'messenger/sendMessage'
}

export const getFriends = createAsyncThunk(
  THUNKS.getFriends,
  async (_, { dispatch }) => {
    try {
      // const friends = ... some API call
      // ... but here we'll use dummy data
      const friends = [
        { id: 'alice', name: 'Alice', avatar: 'https://picsum.photos/250' },
        { id: 'bob', name: 'Bob', avatar: 'https://picsum.photos/200' },
        { id: 'charlie', name: 'Charlie', avatar: 'https://picsum.photos/100' },
      ]

      dispatch(setFriends(friends));
      return friends;
    } catch (error) {
      console.error('Failed to fetch friends', error);
      throw error;
    }
  }
);

export const getChats = createAsyncThunk(
  THUNKS.getChats,
  async (_, { dispatch }) => {
    try {
      // const chats = ... some API call
      // ... but here we'll use dummy data
      const chats = {
        'alice': [
          { id: 1, text: 'Hey there!', senderId: 'alice', timestamp: '9:30 AM' },
          { id: 2, text: 'Hi Alice! How are you?', senderId: 'user', timestamp: '9:32 AM' },
          { id: 3, text: 'I\'m good, thanks! Want to grab lunch later?', senderId: 'alice', timestamp: '9:33 AM' },
        ],
        'bob': [
          { id: 1, text: 'Did you finish the project?', senderId: 'bob', timestamp: '8:45 AM' },
          { id: 2, text: 'Almost done, Bob. Need a few more hours.', senderId: 'user', timestamp: '8:47 AM' },
        ],
        'charlie': [
          { id: 1, text: 'Check out my new artwork!', senderId: 'charlie', timestamp: 'Yesterday' },
        ],
      }

      dispatch(setChats(chats));
      return chats;
    } catch (error) {
      console.error('Failed to fetch friends', error);
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  THUNKS.sendMessage,
  async (text: string, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;

    const friendId = state.selectedFriendId;
    if (!friendId) return rejectWithValue({ error: 'No friend selected', friendId: friendId || '' });

    const chat = state.chats[friendId]
    if (!chat) return rejectWithValue({ error: 'Chat not found', friendId });

    const newMessage: Message = {
      id: chat.length + 1, // or something else like uuid()
      text,
      senderId: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update local state
    dispatch(addMessage({ friendId, ...newMessage }));

    try {
      // Send to backend
    } catch (error) {
      return rejectWithValue({
        error: error instanceof Error ? error.message : 'Unknown error occured while sending message',
        friendId
      });
    }
  }
);

// Selectors
export const selectFriends = (state: RootState) => state.friends;
export const selectChats = (state: RootState) => state.chats;
export const selectFriendId = (state: RootState) => state.selectedFriendId;

export const selectSelectedFriend = createSelector(
  [selectFriends, selectFriendId],
  (friends, selectedId) => friends.find(friend => friend.id === selectedId) || (friends[0] || null)
);

export const selectCurrentMessages = createSelector(
  [selectChats, selectFriendId],
  (chats, selectedId) => selectedId && chats[selectedId] ? chats[selectedId] : []
);

export const store = configureStore({
  reducer: messengerSlice.reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
