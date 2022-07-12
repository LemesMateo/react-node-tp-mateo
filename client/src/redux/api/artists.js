import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
 "x-rapidapi-host": "imdb8.p.rapidapi.com",
 "x-rapidapi-key": "c3e14d75a3msh2a179812f3c3fb8p1d23b4jsn88ced071135a"
};

export const artistsApi = createApi({
 reducerPath: 'artistsApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
 endpoints: (builder) => ({
  fetchArtists: builder.query({
   query: (name) => ({
    url: `/artists?name=${name}`,
    method: 'GET',
    //headers
   })
  }),
  fetchArtist: builder.query({
    query: (artistId) => ({
     url: `/artists/getById?id=${artistId}`,
     method: 'GET',
     //headers
    })
   }),
 })
});

export const { useFetchArtistsQuery, useFetchArtistQuery } = artistsApi;