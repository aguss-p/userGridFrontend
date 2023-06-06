import * as React from 'react';
// import FadeIn from '../FadeIn';
import St from './Grid.styled';
import CustomLoader from '../CustomLoader';
import Header from './Header';
import { ActionHeader } from '../../types/commons/CommonGridFormModal.types';
import { Box, Chip } from '@mui/material';
import { TableColumn } from 'react-data-table-component';

const Grid = (props: Props) => {
    const { data, columns, isLoading, refetch, title, extraActionsInHeader, handleSearchChange } =
        props;
    return (
        <St.Card>
            <Header
                title={title}
                refetch={refetch}
                loading={isLoading}
                handleSearchChange={handleSearchChange}
                extraActionsInHeader={extraActionsInHeader}
            />
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    {data === null ? (
                        <St.ChipContainer>
                            <St.StatusChip
                                label="Error vuelva a intentarlo más tarde"
                                sx={{ borderRadius: '2rem !important' }}
                            />
                        </St.ChipContainer>
                    ) : (data?.length ?? 0) === 0 ? (
                        <St.ChipContainer>
                            <St.StatusChip
                                label="No se encontraron usuarios"
                                sx={{ borderRadius: '2rem !important' }}
                            />
                        </St.ChipContainer>
                    ) : (
                        <St.DataTableStyled
                            customStyles={{
                                rows: { style: { fontFamily: 'Roboto, sans-serif !important' } },
                                headCells: {
                                    style: { fontFamily: 'Roboto, sans-serif !important' },
                                },
                            }}
                            responsive={true}
                            data={data}
                            columns={columns}
                        />
                    )}
                </>
            )}
        </St.Card>
    );
};

Grid.defaultProps = {};

interface Props {
    data: Array<unknown>;
    columns: TableColumn<unknown>[];
    isLoading: boolean;
    refetch: Function;
    title: string;
    extraActionsInHeader?: ActionHeader[];
    handleSearchChange: (e: any) => void;
}

export default Grid;
