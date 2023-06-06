import * as React from 'react';
import CustomGridAction from './CustomGridAction';
import { CustomIconProps } from '../../../types/commons/CommonGridFormModal.types';
import useDialog from '../../../hooks/common/dialog.hooks';
import { useTheme } from '@mui/material';

const CustomGridActionContainer = (props: Props) => {
    const { isOpen, open, close } = useDialog();
    const theme = useTheme();
    const childProps = {
        isOpen,
        open,
        close,
        theme,
        ...props,
    };

    return <CustomGridAction {...childProps} />;
};

CustomGridActionContainer.defaultProps = { width: '40%' };

interface Props {
    component?: React.FunctionComponent;
    Icon: (props: CustomIconProps) => JSX.Element;
    row?: any;
    width: string | { [key: string]: string };
    ButtonElement?: (props: { open: () => void }) => JSX.Element;
    customizedTitle?: boolean;
    modalTitle: string;
    type: string;
}

export default CustomGridActionContainer;
