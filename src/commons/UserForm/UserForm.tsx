import * as React from 'react';
import St from './UserForm.styled';
import { Form, FormikContextType, FormikProvider } from 'formik';
import { CircularProgress, useTheme } from '@mui/material';

const UserForm = (props: Props) => {
    const {
        telefonoRegex,
        isLoadingGetUser,
        formik,
        isSubmitting,
        isError,
        apiError,
        isEdit,
        isDetail,
    } = props;
    const theme = useTheme();
    const { errors, values, setFieldValue } = formik;
    console.log('errores', errors);

    return (
        <>
            {isLoadingGetUser ? (
                <>
                    <CircularProgress />
                </>
            ) : (
                <FormikProvider value={formik}>
                    <Form style={{ backgroundColor: theme.palette.common.white }}>
                        <St.Grid container spacing={2} py={3}>
                            <St.TextField
                                autoFocus={true}
                                label={`Username${isDetail || isEdit ? '' : '*'}`}
                                id="Username"
                                fullWidth
                                type="text"
                                value={values.username}
                                onChange={e => setFieldValue('username', e.target.value)}
                                error={errors.username !== undefined}
                                helperText={errors.username?.toString()}
                                placeholder={'Nombre de usuario'}
                                disabled={isDetail}
                                inputProps={{
                                    maxLength: 24 ?? '',
                                }}
                                autoComplete="off"
                                variant="outlined"
                            />
                            <St.TextField
                                label={`Email${isDetail || isEdit ? '' : '*'}`}
                                id="email"
                                fullWidth
                                type="text"
                                value={values.email}
                                onChange={e => setFieldValue('email', e.target.value)}
                                error={errors.email !== undefined}
                                helperText={errors.email?.toString()}
                                placeholder={'Email'}
                                disabled={isDetail}
                                inputProps={{
                                    maxLength: 50 ?? '',
                                }}
                                autoComplete="off"
                                variant="outlined"
                            />
                            <St.TextField
                                label={`Teléfono${isDetail || isEdit ? '' : '*'}`}
                                id="telefono"
                                fullWidth
                                type="text"
                                value={values.telefono}
                                onChange={e =>
                                    setFieldValue(
                                        'telefono',
                                        e.target.value.replace(telefonoRegex, ''),
                                    )
                                }
                                error={errors.telefono !== undefined}
                                helperText={errors.telefono?.toString()}
                                placeholder={'Teléfono'}
                                disabled={isDetail}
                                inputProps={{
                                    maxLength: 30 ?? '',
                                }}
                                autoComplete="off"
                                variant="outlined"
                            />
                        </St.Grid>
                        {!isDetail && (
                            <St.ButtonsContainer>
                                <St.LoadingButton
                                    loading={isSubmitting || isLoadingGetUser}
                                    variant="contained"
                                    size="small"
                                    type="submit">
                                    {isEdit ? `Editar` : `Guardar`}
                                </St.LoadingButton>
                            </St.ButtonsContainer>
                        )}
                    </Form>
                </FormikProvider>
            )}
        </>
    );
};

UserForm.defaultProps = {};

interface Props {
    isSubmitting: boolean;
    isError: boolean;
    isEdit: boolean;
    isDetail: boolean;
    isLoadingGetUser: boolean;
    apiError: string;
    formik: FormikContextType<any>;
    telefonoRegex: RegExp;
}

export default UserForm;
