import { AlertColor } from '@mui/material';
import { FunctionComponent } from 'react';

export interface DataCommonGridFormModal {
    close: () => void;
    setSnackBarMessageError: (message: string) => void;
    setSnackBarMessageSuccess: (message: string) => void;
}

export interface DataCommonGridEditFormModal extends DataCommonGridFormModal {
    entity: any;
}

export interface CustomIconProps {
    sx: { color: string; cursor: string };
    row: any;
}

export interface ActionColumn {
    id: string;
    title:string;
    component?: FunctionComponent;
    icon: (props: CustomIconProps) => JSX.Element;
    width?: string | { [key: string]: string };
    onIconClick?: any;
    isHidden?: (props: any) => boolean;
    customizedComponent?: boolean;
    customizedTitle?: boolean;
}

export interface ActionHeader {
    id: string;
    component: FunctionComponent;
}

export interface ExtraQueryFiltersProps {
    query: string | null;
    queryValue: string | number | boolean | null;
}

export interface CanExportProps {
    resource: string;
    columns: Array<any>;
    pathApi: string;
    extraFilters?: Array<ExtraQueryFiltersProps>;
    pageLoading: boolean;
    fake?: boolean;
}

export interface ModalActionProps {
    row: any;
    setSnackbarMessage: (msj: string, sever: AlertColor) => void;
    close: () => void;
}

export interface GridHookParams {
    filterQueryString: string;
    extraFilters: Array<ExtraQueryFiltersProps>;
    forceDisable?: boolean;
    abort: any;
}
