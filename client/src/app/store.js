import { configureStore } from '@reduxjs/toolkit';
import { songsApi } from "../redux/api/songs";
import { artistsApi } from '../redux/api/artists';
import { albumsApi } from '../redux/api/albums';
import { userSlice } from '../redux/api/userSlice';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware, artistsApi.middleware, albumsApi.middleware, userSlice.middleware),
  devTools: true
});