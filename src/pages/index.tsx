import * as React from 'react';
import { Switch, Theme, ThemeProvider, Typography, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import darkTheme from '../utils/theme/darkTheme';
import lightTheme from '../utils/theme/lightTheme';
import { Dispatch, SetStateAction, useState } from 'react';
import Grid from '../commons/Grid';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Edit from '@mui/icons-material/Edit';
import { Add, DarkMode, DeleteOutline, LightMode } from '@mui/icons-material';
import St from '../commons/StyledComponents/CommonStyledComponents.styled';
import CustomGridAction from '../commons/Grid/CustomGridAction';
import UserForm from '../commons/UserForm';
import DeleteUserModal from '../commons/DeleteUserModal';
import { useGetUsers } from '../hooks/api/users.hook';
import { ActionColumn, ActionHeader } from '../types/commons/CommonGridFormModal.types';
import { User } from '../types/users/Users.types';

// import backgroundImg from "../assets/img/backgroundImg.jpeg";

const UsersPage: React.FC<{ props: Props }> = ({ props }: { props: Props }) => {
    const {
        queryClient,
        darkMode,
        setDarkMode,
        columns,
        actionColumns,
        theme,
        headerActions,
        needRefetch,
        setNeedRefetch,
    } = props;

    return (
        <main>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <St.BackgroundImg />
                    {!darkMode && <St.BackgroundFilter />}
                    {/* <LightMode color="#fffec2" /> */}
                    <St.SwitchCointainer>
                        <St.SwitchCard>
                            <LightMode style={{ color: '#ffc161' }} />
                            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <DarkMode style={{ color: '#ffffff' }} />
                        </St.SwitchCard>
                    </St.SwitchCointainer>
                    <St.GridWrapper>
                        <Grid
                            title="Usuarios"
                            columns={columns}
                            customActionColumns={actionColumns}
                            extraActionsInHeader={headerActions}
                            needRefetch={needRefetch}
                            setNeedRefetch={setNeedRefetch}
                            fetchHook={useGetUsers}
                        />
                    </St.GridWrapper>
                </QueryClientProvider>
            </ThemeProvider>
        </main>
    );
};
const UsersPageContainer: React.FC<{}> = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [needRefetch, setNeedRefetch] = useState<boolean>(false);
    const queryClient: QueryClient = new QueryClient();

    const theme = React.useMemo(() => {
        const currentTheme = createTheme(darkMode ? darkTheme : lightTheme);
        return currentTheme;
    }, [darkMode]);

    const columns: Array<any> = [
        {
            id: 'username',
            name: 'username',
            selector: (row: User) => row?.username,
            sortField: 'id',
            sortable: true,
        },
        {
            id: 'email',
            name: 'email',
            selector: (row: User) => row?.email,
            sortField: 'email',
            sortable: true,
        },
        {
            id: 'telefono',
            name: 'telefono',
            selector: (row: User) => row?.telefono,
            sortField: 'telefono',
            sortable: true,
        },
    ];

    const actionColumns: ActionColumn[] = [
        {
            id: 'detail-user',
            title: 'Detalle',
            icon: (props: any) => (
                <VisibilityRoundedIcon
                    sx={{ color: `${theme.palette.primary.main}`, cursor: 'pointer' }}
                />
            ),
            component: (props: any) => (
                <UserForm {...props} isDetail id={props.row.Id} setNeedRefetch={setNeedRefetch} />
            ),
        },
        {
            id: 'edit-user',
            title: 'Editar',
            icon: (props: any) => (
                <Edit sx={{ color: `${theme.palette.primary.main}`, cursor: 'pointer' }} />
            ),
            component: (props: any) => (
                <UserForm {...props} isEdit id={props.row.Id} setNeedRefetch={setNeedRefetch} />
            ),
        },
        {
            id: 'delete-user',
            title: 'Eliminar',

            icon: (props: any) => (
                <DeleteOutline sx={{ color: `${theme.palette.primary.main}`, cursor: 'pointer' }} />
            ),
            component: (props: any) => (
                <DeleteUserModal
                    close={props.close}
                    id={props.row.Id}
                    username={props.row.username}
                    setNeedRefetch={setNeedRefetch}
                />
            ),
        },
    ];
    const headerActions: ActionHeader[] = [
        {
            id: 'users',
            component: () => (
                <CustomGridAction
                    modalTitle="Crear usuario"
                    component={(props: any) => (
                        <UserForm {...props} setNeedRefetch={setNeedRefetch} />
                    )}
                    Icon={() => (
                        <Add sx={{ color: `${theme.palette.primary.main}`, cursor: 'pointer' }} />
                    )}
                    type="create"
                    width={{ xs: '90%', sm: '20%' }}
                />
            ),
        },
    ];
    const childProps: Props = {
        columns,
        actionColumns,
        darkMode,
        setDarkMode,
        theme,
        queryClient,
        headerActions,
        needRefetch,
        setNeedRefetch,
    };
    return <UsersPage props={childProps} />;
};

interface Props {
    columns: Array<any>;
    actionColumns: ActionColumn[];
    headerActions: ActionHeader[];
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    theme: Theme;
    queryClient: QueryClient;
    needRefetch: boolean;
    setNeedRefetch: Dispatch<SetStateAction<boolean>>;
}

export default UsersPageContainer;

// export const Head: HeadFC = () => <title>Home Page</title>
