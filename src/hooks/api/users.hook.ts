import React, { useMemo, useState } from 'react';
import endpoints from '../../api/users/users.api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
    const [searchText, setSearchText] = useState('');
    const queryFilter: string = useMemo(() => {
        let extraQueryFilters = '';
        if (searchText != '') extraQueryFilters += `?searchText=${searchText}`;
        return extraQueryFilters;
    }, [searchText]);
    const { data, isFetching, isLoading, refetch, isFetched, dataUpdatedAt, status } = useQuery(
        ['users', searchText],
        () => endpoints.getUsers(queryFilter ?? ''),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            retryDelay: 3000,
        },
    );
    return {
        data: data?.data,
        isLoading: isLoading || isFetching,
        refetch,
        isFetched,
        setSearchText,
        dataUpdatedAt,
    };
};
export const useDeleteUser = (id: string) => {
    const { mutateAsync, isLoading, isSuccess } = useMutation(['deleteUser'], () =>
        endpoints.deleteUsers(id),
    );
    return { mutate: mutateAsync, isLoading, isSuccess };
};
export const useGetUserById = ({ id, enable }: { id: string; enable: boolean }) => {
    const { data, isFetching, isLoading, isFetched, status } = useQuery(
        ['user', id],
        () => endpoints.getUserById(id),
        {
            enabled: enable,
        },
    );
    return { data: data?.data, isLoading: isLoading && isFetching, isFetched };
};
export const useUpdateUser = (config: any) => {
    const { mutate, isLoading, error, isError } = useMutation(endpoints.updateUsers, { ...config });
    return {
        mutate,
        isLoading,
        error: (error as any)?.response?.data?.error_messages[0] ?? '',
        isError,
    };
};
export const useCreateUser = (config: any) => {
    const { mutate, isLoading, error, isError } = useMutation(endpoints.createUsers, { ...config });
    return {
        mutate,
        isLoading,
        error: (error as any)?.response?.data?.error_messages[0] ?? '',
        isError,
    };
};
