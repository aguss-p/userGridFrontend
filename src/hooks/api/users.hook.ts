import React, { useMemo, useState } from 'react';
// import { userRequestsAdapter } from 'adapters/common/users.adapter';
import endpoints from '../../api/users/users.api';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { UserContext } from 'context/user.context';
// import { GridHookParams } from 'types/common/CommonGrid/CommonGridFormModal.types';
// import { GetUsersResponse } from 'types/users/users.api.types';
// import { userDataAdapter, usersDataAdapter } from 'adapters/users/users.adapter';

export const useGetUsers = () => {
    const [searchText, setSearchText] = useState('');
    const queryFilter:string=useMemo(()=>{
        let extraQueryFilters = '';
        if(searchText!="")
            extraQueryFilters += `?searchText=${searchText}`;
        return extraQueryFilters;
    },[searchText])
    const { data, isFetching, isLoading, refetch, isFetched,dataUpdatedAt,status } = useQuery(
        ['users', searchText],
        () => endpoints.getUsers(queryFilter??""),
    );
    return { data: data?.data, isLoading: (isLoading || isFetching), refetch, isFetched,setSearchText,dataUpdatedAt };
};
export const useDeleteUser = (id:string) => {
    const { mutateAsync, isLoading,isSuccess} = useMutation(
        ['deleteUser'],
        () => endpoints.deleteUsers(id),
    );
    return { mutate:mutateAsync ,isLoading,isSuccess  };
};
export const useGetUserById = ({ id, enable }: any) => {
    const { data, isFetching, isLoading, isFetched,status} = useQuery(
        ['user', id],
        () => endpoints.getUserById(id),
        {
            enabled: enable,
        },
    );
    return { data: data?.data, isLoading: isLoading && isFetching, isFetched };
};
export const useUpdateUser = (config:any) => {
    const { mutate, isLoading, error, isError } = useMutation(endpoints.updateUsers,{...config} );
    return {
        mutate,
        isLoading,
        error: (error as any)?.response?.data?.error_messages[0] ?? '',
        isError,
    };
};
export const useCreateUser = (config:any) => {
    const { mutate, isLoading, error, isError } = useMutation(endpoints.createUsers,{...config});
    return {
        mutate,
        isLoading,
        error: (error as any)?.response?.data?.error_messages[0] ?? '',
        isError,
    };
};
