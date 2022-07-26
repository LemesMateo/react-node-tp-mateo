import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
 "x-rapidapi-host": "imdb8.p.rapidapi.com",
 "x-rapidapi-key": "c3e14d75a3msh2a179812f3c3fb8p1d23b4jsn88ced071135a"
};

export const albumsApi = createApi({
 reducerPath: 'albumsApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://mateo-tp-final-utn.herokuapp.com/api' }),
 endpoints: (builder) => ({
  fetchAlbums: builder.query({
   query: (title) => ({
    url: `/albums?title=${title}`,
    method: 'GET',
    //headers
   })
  }),
  fetchAlbum: builder.query({
    query: (albumId) => ({
     url: `/albums/getById?id=${albumId}`,
     method: 'GET',
     //headers
    })
   }),
 })
});

export const { useFetchAlbumsQuery, useFetchAlbumQuery } = albumsApi;