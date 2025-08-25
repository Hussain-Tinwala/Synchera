import React from 'react'
import { getAuthUser } from '../lib/api.js';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    // const { data: authData, isLoading, error } = useQuery({
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthUser,
        retry: false,
        // The query should only run if the user is not in a state of logging out or has a potential token.
        // A simple way is to manage this with a state variable, but the core issue is that it runs on the initial load when there's no auth cookie.
        // The existing code is a common pattern, and the error is expected behavior. The error handling is what's important.
    });

    return { isLoading: authUser.isLoading, authUser: authUser.data?.user}
}

export default useAuthUser