import { userSlice } from "../../redux/api/userSlice";

export const authApiSlice = userSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice