import * as React from 'react';
import { useGetUsers } from '../../hooks/api/users.hook';
import { Stack } from '@mui/material';
import { ActionColumn, ActionHeader } from '../../types/commons/CommonGridFormModal.types';
import Grid from './Grid';
import CustomTableAction from './CustomGridAction';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const GridContainer = (props: Props) => {
    const { columns, customActionColumns, setNeedRefetch, needRefetch } = props;
    const today = new Date();
    const { data, isLoading, refetch, setSearchText, dataUpdatedAt } = useGetUsers();
    const [localLoading, setLocalLoading] = useState(false);
    useEffect(() => {
        if (needRefetch) {
            refetch();
            setNeedRefetch(false);
        }
    }, [needRefetch]);
    // este useEffect es unicamente para que no sea tan inmediata y quede mal el loader
    useEffect(() => {
        const delayLoader = async (time: number) => {
            await setTimeout(() => {
                setLocalLoading(isLoading);
            }, time);
        };
        if (!isLoading && today.getTime() - (dataUpdatedAt ?? 0) < 1000) {
            delayLoader(1000);
        } else {
            setLocalLoading(isLoading);
        }
    }, [isLoading]);
    const handleSearchChange = async (e: any) => {
        setTimeout(() => {
            setSearchText(e.target.value);
        }, 1000);
    };

    const extraColumnsActions = React.useCallback(
        (row: any) => (
            <Stack direction="row" spacing={2}>
                {customActionColumns?.map((customActionColumn: ActionColumn) => (
                    <CustomTableAction
                        key={customActionColumn.id}
                        row={row}
                        component={customActionColumn.component}
                        Icon={customActionColumn.icon}
                        width={customActionColumn?.width}
                        modalTitle={customActionColumn.title}
                        type={`${customActionColumn.id}`}
                        customizedTitle={customActionColumn?.customizedTitle}
                    />
                ))}
            </Stack>
        ),
        [customActionColumns],
    );
    let finalColumns = columns;
    if (customActionColumns && customActionColumns?.length > 0) {
        finalColumns = columns.concat([
            {
                cell: extraColumnsActions,
                name: 'Acciones',
                center: true,
                maxWidth: '200px',
            },
        ]);
    }
    const childProps = {
        ...props,
        data,
        columns: finalColumns,
        isLoading: localLoading,
        handleSearchChange,
        refetch,
    };

    return <Grid {...childProps} />;
};

GridContainer.defaultProps = {};

interface Props {
    title: string;
    columns: Array<any>;
    customActionColumns?: ActionColumn[];
    extraActionsInHeader?: ActionHeader[];
    needRefetch: boolean;
    setNeedRefetch: Dispatch<SetStateAction<boolean>>;
}

export default GridContainer;
