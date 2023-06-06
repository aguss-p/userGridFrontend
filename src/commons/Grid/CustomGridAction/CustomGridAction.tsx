import * as React from 'react';
import { AlertColor, Box, Theme, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import St from './CustomGridAction.styled';
import TableHeaderButton from '../HeaderButton';
import HeaderButton from '../HeaderButton';

const CustomGridAction = (props: Props) => {
    const {
        component,
        modalTitle,
        type,
        Icon,
        row,
        width,
        ButtonElement,
        customizedTitle,
        isOpen,
        open,
        close,
        theme,
    } = props;

    return (
        <>
            {type === 'create' ? (
                <HeaderButton text={modalTitle} handleClick={open} Icon={AddIcon} />
            ) : (
                (ButtonElement && ButtonElement({ open })) || (
                    <St.Tooltip title={modalTitle}>
                        <Box onClick={() => open()}>
                            <Icon sx={{ color: 'secondary.main', cursor: 'pointer' }} row={row} />
                        </Box>
                    </St.Tooltip>
                )
            )}
            {isOpen && (
                <St.Modal
                    open={isOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <St.ModalContentWrapper ownerState={{ width }}>
                        {!customizedTitle && (
                            <>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h5"
                                    component="h2"
                                    color={theme.palette.primary.main}>
                                    {modalTitle}
                                </Typography>
                                <St.CloseIconButton
                                    aria-label="close"
                                    onClick={close}
                                    color={'primary'}>
                                    <CloseIcon sx={{ color: theme.palette.primary.main }} />
                                </St.CloseIconButton>
                            </>
                        )}
                        {component &&
                            component({
                                close,
                                row,
                            })}
                    </St.ModalContentWrapper>
                </St.Modal>
            )}
        </>
    );
};

CustomGridAction.defaultProps = {};

interface Props {
    component?: React.FunctionComponent;
    Icon: (props: any) => JSX.Element;
    row?: any;
    modalTitle: string;
    type: string;
    isOpen: boolean;
    width: string | { [key: string]: string };
    ButtonElement?: (props: { open: () => void }) => JSX.Element;
    customizedTitle?: boolean;
    open: () => void;
    close: () => void;
    theme: Theme;
}

export default CustomGridAction;
