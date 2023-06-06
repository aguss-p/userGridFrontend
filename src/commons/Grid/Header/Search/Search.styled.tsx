import { InputBase, alpha, styled } from '@mui/material';

export default {
    SearchStyled: styled('div')(({ theme }) => ({
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,
        border: `solid 1px rgb(145, 158, 171)`,
        marginLeft: 0,
        minWidth: '120px',
        position: 'relative',
        '&:hover': {
            border: `solid 1px ${theme.palette.primary.main}`,
        },
    })),
    SearchIconWrapper: styled('div')(({ theme }) => ({
        color: 'rgb(145, 158, 171)',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        pointerEvents: 'none',
        position: 'absolute',
    })),
    StyledInputBase: styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
            // padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(3)})`,
            paddingTop: '3%',
            alignSelf: 'center',
            transition: theme.transitions.create('width'),
            '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: 'rgb(145, 158, 171)',
            },
            width: '100%',
        },
    })),
};
