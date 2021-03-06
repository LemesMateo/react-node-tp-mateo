import { configureStore } from '@reduxjs/toolkit';
import { songsApi } from "../redux/api/songs";
import { artistsApi } from '../redux/api/artists';
import { albumsApi } from '../redux/api/albums';
import { authApi } from '../services/authApi';

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware, artistsApi.middleware, albumsApi.middleware, authApi.middleware)
});