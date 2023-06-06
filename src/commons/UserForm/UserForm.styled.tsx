import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField, styled } from '@mui/material';

export default {
    Grid: styled(Grid)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 2rem 2rem 2rem',
        gap: 20,
        // backgroundColor: theme.palette.common.white,
    })),
    GridForm: styled(Grid)(() => ({
        display: 'grid',
        justifyContent: 'center',
        // flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        rowGap: '10px',
        columnGap: '5px',
    })),
    ButtonsContainer: styled(Box)(({ theme }) => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
    })),
    LoadingButton: styled(LoadingButton)(({ theme }) =>
        theme.unstable_sx({
            width: { xs: '100%', sm: 'auto' },
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.black,
            borderRadius: '2rem',
            padding: '4px 10px 4px 10px',
        }),
    ),
    TextField: styled(TextField)(({ theme, disabled }) => {
        return theme.unstable_sx({
            input: {
                WebkitTextFillColor: `${
                    disabled ? theme.palette.common.black : theme.palette.common.black
                } !important`,
                color: disabled ? 'rgba(0,0,0,0.7) !important' : theme.palette.common.black,
                opacity: `${disabled ? 0.7 : 1} !important`,
                backgroundColor: disabled ? 'rgba(0,0,0,0.05) ' : theme.palette.common.white,
            },
            label: {
                color: `${
                    disabled ? theme.palette.common.black : theme.palette.common.black
                } !important`,
            },
            '& .MuiOutlinedInput-root': {
                fieldset: {
                    borderColor: `${
                        disabled ? theme.palette.common.black : theme.palette.common.black
                    } !important`,
                },
                '&:hover fieldset': {
                    borderColor: disabled ? 'none' : theme.palette.primary.main,
                },
            },
        });
    }),
};
