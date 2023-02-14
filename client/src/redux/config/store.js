import {configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slice/postSlice';
import userReducer from '../slice/userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

const rootReducer = combineReducers({
    post: persistReducer(
      {
        key: 'post',
        storage: storage,
        blacklist: ['currentPost', 'isPending', 'error'],
      },

      postsReducer,
    ),
    user: persistReducer(
        {
          key: 'user',
          storage: storage,
          blacklist: ['error', 'userPosts'],
        },
        userReducer,
      ),
  });

// const store = configureStore({
//     reducer: {
//         post: postsReducer,
//         user: userReducer
//     }
// });

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  export const persistor = persistStore(store);
  export default store;