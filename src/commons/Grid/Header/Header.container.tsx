import * as React from 'react';
import Header from './Header';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { ActionHeader } from '../../../types/commons/CommonGridFormModal.types';

const HeaderContainer = (props: Props) => {
    // const {} = props;

    const childProps = {
        ...props,
    };

    return <Header {...childProps} />;
};

HeaderContainer.defaultProps = {};

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

export default HeaderContainer;
