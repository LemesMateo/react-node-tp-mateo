import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "x-rapidapi-host": "imdb8.p.rapidapi.com",
  "x-rapidapi-key": "c3e14d75a3msh2a179812f3c3fb8p1d23b4jsn88ced071135a",
};

export const songsApi = createApi({
  reducerPath: "songsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mateo-tp-final-utn.herokuapp.com/api" }),
  tagTypes: ['Songs'],
  endpoints: (builder) => ({
    fetchSongs: builder.query({
      query: (title) => ({
        url: `/songs?title=${title}`,
        method: "GET",
        providesTags: ['Songs']
        //headers
      }),
    }),
    fetchSong: builder.query({
      query: (songId) => ({
        url: `/songs/getById?id=${songId}?`,
        method: "GET",
      })
    }),
    fetchSongsByAlbumId: builder.query({
      query: (albumId) => ({
        url: `/songs/getByAlbumId?album_id=${albumId}`,
        method: "GET",
        //headers
      }),
    }),
    fetchSongsByArtistId: builder.query({
      query: (artistId) => ({
        url: `/songs/getByArtistId?artist_id=${artistId}`,
        method: "GET",
        //headers
      }),
    }),
    addSong: builder.mutation({
      query: (song) => ({
        url: `/songs/add`,
        method: "POST",
        body: song,
        invalidatesTags: ['Songs'],
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem("login")).token}`}
      }),
    }),
    updateSong: builder.mutation({
      query: (song) => ({
        url: `/songs/edit/${song.id}`,
        method: "POST",
        body: song,
        invalidatesTags: ['Songs'],
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem("login")).token}`}
      }),
    }),
    deleteSong: builder.mutation({
      query: ( songId ) => ({
        url: `/songs/delete/${songId}`,
        method: "DELETE",
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem("login")).token}`}
      }),
    }),
  }),
});

export const {
  useFetchSongsQuery,
  useFetchSongsByAlbumIdQuery,
  useFetchSongQuery,
  useFetchSongsByArtistIdQuery,
  useAddSongMutation,
  useDeleteSongMutation,
  useUpdateSongMutation,
} = songsApi;
