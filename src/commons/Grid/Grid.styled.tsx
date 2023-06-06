import { Box, Card, Chip, Theme, Typography, styled } from '@mui/material';
import DataTable from 'react-data-table-component';

export default {
    Card: styled(Card)(({ theme }) => ({
        zIndex: 99,
        borderRadius: '12px',
        backgroundColor: theme.palette.common.white,
        '>div': {
            borderRadius: 'unset',
        },
    })),
    ChipContainer: styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10rem',
    })),
    StatusChip: styled(Chip)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
        fontWeight: 700,
        color: theme.palette.common.black,
    })),
    DataTableStyled: styled(DataTable)(
        ({ theme }) =>
            `
   
        .rdt_TableBody {
            padding-bottom: 0.7rem;
            background-color: ${theme.palette.common.white};
        }

        .rdt_TableHeadRow {
            background-color: ${theme.palette.common.white};
            color:  ${theme.palette.common.black};
            border-color:${theme.palette.common.black};

            font-weight: 600;
            .rdt_TableCol_Sortable {
                text-transform: uppercase;
            }
        }
        .rdt_TableRow {
            background-color: ${theme.palette.common.white};
            color:  ${theme.palette.common.black};
            border-color:${theme.palette.common.black};
            &:hover {
                background: rgba(0, 0, 0, 0.04);
            }
            min-height: 32px;
        }

        .rdt_TableCol {
            justify-content: center;
            min-width: max-content;
        }

        .rdt_TableCell {
            padding: '0px';
        }
        .rdt_TableCell:last-child {
            border-right: none;
        }
    `,
    ),
};
