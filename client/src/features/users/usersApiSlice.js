import { userSlice } from "../../redux/api/userSlice"

export const usersApiSlice = userSlice.injectEndpoints({
    endpoings: builder => ({ 
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5,
        })
    })
})

export const { 
    useGetUsersQuery
} = usersApiSlice