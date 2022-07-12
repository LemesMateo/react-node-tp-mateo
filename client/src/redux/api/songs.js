import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
 "x-rapidapi-host": "imdb8.p.rapidapi.com",
 "x-rapidapi-key": "c3e14d75a3msh2a179812f3c3fb8p1d23b4jsn88ced071135a"
};

export const songsApi = createApi({
 reducerPath: 'songsApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
 endpoints: (builder) => ({
  fetchSongs: builder.query({
   query: (title) => ({
    url: `/songs?title=${title}`,
    method: 'GET',
    //headers
   })
  }),
  fetchSongsByAlbumId: builder.query({
    query: (albumId) => ({
     url: `/songs/getByAlbumId?album_id=${albumId}`,
     method: 'GET',
     //headers
    })
   }),
   fetchSongsByArtistId: builder.query({
    query: (artistId) => ({
     url: `/songs/getByArtistId?artist_id=${artistId}`,
     method: 'GET',
     //headers
    })
   }),
 })
});

export const { useFetchSongsQuery, useFetchSongsByAlbumIdQuery, useFetchSongQuery, useFetchSongsByArtistIdQuery } = songsApi;