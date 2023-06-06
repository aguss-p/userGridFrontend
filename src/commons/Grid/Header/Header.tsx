import * as React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Box, CircularProgress, SvgIconTypeMap } from '@mui/material';
import St from './Header.styled';
import { ActionHeader } from '../../../types/commons/CommonGridFormModal.types';
import RefreshButton from '../../RefreshButton';
import Search from './Search';

const Header = (props: Props) => {
    const { loading, refetch, title, extraActionsInHeader, handleSearchChange } = props;
    return (
        <St.Header>
            <St.SideContainer
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: '5px', sm: '2rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <St.GridTitle>{title}</St.GridTitle>
                </Box>
                <RefreshButton refresh={refetch} disabled={loading} />
            </St.SideContainer>
            <St.SideContainer
                flexDirection={{ xs: 'column-reverse', sm: 'row' }}
                gap={{ xs: '5px', sm: '2rem' }}>
                <Search handleSearchChange={handleSearchChange} disabled={loading} />
                {loading && extraActionsInHeader ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <CircularProgress color="primary" size="1rem" />
                    </Box>
                ) : (
                    extraActionsInHeader?.map((item: ActionHeader) => (
                        <item.component key={item.id} />
                    ))
                )}
            </St.SideContainer>
        </St.Header>
    );
};

Header.defaultProps = {};

interface Props {
    Icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string;
    };
    loading: boolean;
    refetch: any;
    title: string;
    extraActionsInHeader?: ActionHeader[];
    handleSearchChange: (e: any) => void;
}

export default Header;
