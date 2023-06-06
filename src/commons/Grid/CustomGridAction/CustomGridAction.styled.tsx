import { styled, Modal, Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';

const ToBeStyledTooltip = ({ className, ...props }: any) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
);

export default {
    ModalContentWrapper: styled(Box)<{ ownerState: { width: string | { [key: string]: string } } }>(
        ({ ownerState, theme }) => {
            const { width } = ownerState;
            return theme.unstable_sx({
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width,
                minWidth: `${width ? '305px' : '400px'}`,
                height: 'max-content',
                maxHeight: { xs: '98%', sm: '95%' },
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '5px',
                p: 2,
                overflow: 'auto',
                backgroundColor: theme.palette.common.white,
            });
        },
    ),
    Modal: styled(Modal)(({ theme }) => ({
        overflowY: 'auto',
        mt: '10px',
        mb: '10px',
    })),
    CloseIconButton: styled(IconButton)(({ theme }) => ({
        position: 'absolute',
        right: 8,
        top: 8,
    })),
    Tooltip: styled(ToBeStyledTooltip)(({ theme }) => ({
        color: '#F7F7F7',
        // '& .MuiTooltip-arrow': {
        //     color: `${theme.palette.common.black} !important`,
        // },
    })),
};
