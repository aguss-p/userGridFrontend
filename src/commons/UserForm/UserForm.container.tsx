import * as React from 'react';
import UserForm from './UserForm';
import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { useCreateUser, useGetUserById, useUpdateUser } from '../../hooks/api/users.hook';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../../types/users/Users.types';
// import { useCreateUser, useGetUserByUsername, useUpdateUser } from 'hooks/api/users.hook';
const getInitialValues = (data?: any) => ({
    username: data?.username ?? '',
    email: data?.email ?? '',
    telefono: data?.telefono ?? '',
});
const getValidationSchema = () =>
    Yup.object().shape({
        username: Yup.string()
            .matches(/^[^\s]*$/, 'No pude contener espacios')
            .matches(/^[a-zA-Z0-9\s]*$/, 'No pude contener caracteres especiales')
            .max(24, 'El nombre no puede exceder los 24 caracteres.')
            .required('Campo requerido'),
        email: Yup.string().email('Ingrese un email valido').required('Campo requerido'),
        telefono: Yup.string()
            .matches(
                /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?\d{1,4}[-\s]?\d{1,9}[-\s]?\d{1,9}$/,
                'Número de teléfono inválido',
            )
            .required('Campo requerido'),
    });
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

    const handleSubmit = (values: FormikValues) => {
        if (isEdit) updateUser({ body: values, id } as { body: User; id: string });
        else createUser(values as User);
    };

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
