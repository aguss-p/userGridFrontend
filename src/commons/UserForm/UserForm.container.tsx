import * as React from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { useCreateUser, useGetUserById, useUpdateUser } from '../../hooks/api/users.hook';
import { Dispatch, SetStateAction } from 'react';
// import { useCreateUser, useGetUserByUsername, useUpdateUser } from 'hooks/api/users.hook';
const getInitialValues = (data?: any) => {
    return {
        username: data?.username ?? '',
        email: data?.email ?? '',
        telefono: data?.telefono ?? '',
    };
};
const getValidationSchema = () => {
    Yup.object().shape({
        username: Yup.string()
            .max(24, 'El nombre no puede exceder los 24 caracteres.')
            .required('Campo requerido'),
        email: Yup.string().email('Ingrese un email valido').required('Campo requerido'),
        telefono: Yup.string().required('Campo requerido'),
    });
};

// ---------------------------------------------//
// ---------------------------------------------//
// ---------------------------------------------//

const UserFormContainer = (props: Props) => {
    const { isDetail = false, isEdit = false, close, id, setNeedRefetch } = props;
    const config = {
        onSuccess: () => {
            close();
            setNeedRefetch(true);
        },
    };
    const { data, isLoading: isLoadingGetUser } = useGetUserById({
        id: id ?? '',
        enable: isEdit || isDetail,
    });
    console.log(data, 'data');

    const telefonoRegex = /[a-zA-Z-/?¿!|"#$%&/()=*]/;
    const {
        mutate: createUser,
        isLoading: isLoadingCreateUser,
        error: createApiError,
        isError: createApiIsError,
    } = useCreateUser(config);

    const {
        mutate: updateUser,
        isLoading: isLoadingUpdateUser,
        error: updateApiError,
        isError: updateApiIsError,
    } = useUpdateUser(config);

    const handleSubmit = React.useCallback(async (values: FormikValues) => {
        if (isEdit) updateUser({ body: values, id });
        else createUser(values as any);
    }, []);

    const formikInitProps = React.useMemo(
        () => ({
            initialValues: getInitialValues(data),
            validateOnChange: false,
            validateOnBlur: false,
            validationSchema: getValidationSchema(),
            onSubmit: handleSubmit,
            enableReinitialize: true,
        }),
        [handleSubmit, data],
    );

    const formik = useFormik(formikInitProps);
    const childProps = {
        ...props,
        isDetail,
        isEdit,
        enable: isEdit || isDetail,
        formik,
        isSubmitting: isLoadingCreateUser || isLoadingUpdateUser,
        isError: createApiIsError || updateApiIsError,
        apiError: createApiError || updateApiError,
        isLoadingGetUser,
        telefonoRegex,
    };

    return <UserForm {...childProps} />;
};

UserFormContainer.defaultProps = {
    isEdit: false,
    isDetail: false,
};

interface Props {
    close: () => void;
    isEdit?: boolean;
    isDetail?: boolean;
    id?: string;
    setNeedRefetch: Dispatch<SetStateAction<boolean>>;
}

export default UserFormContainer;
