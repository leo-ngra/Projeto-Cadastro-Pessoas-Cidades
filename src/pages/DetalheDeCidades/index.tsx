
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup'

import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe";
import { IVFormErrors } from "../../shared/form/IVFormErrors";
import { VTextField } from "../../shared/form/VTextField";
import { useForm } from "../../shared/hooks/useForm";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { CidadesService } from "../../shared/services/api/CidadesService";

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const DetalheDeCidades = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/cidades')
                    } else {
                        setNome(result.nome)

                        formRef.current?.setData(result)
                    }
                })
        } else {
            formRef.current?.setData({
                nome: '',
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true)

                if (id === 'nova') {
                    CidadesService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false)

                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate(`/cidades`)
                                } else {
                                    navigate(`/cidades/detalhe/${result}`)
                                }
                            }
                        })
                } else {
                    CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false)

                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate(`/cidades`)
                                }
                            }
                        })
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                }) 
                console.log(validationErrors)
                formRef.current?.setErrors(validationErrors)
            })
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar?')) {
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/cidades')
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Cidade' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmVoltar={() => navigate('/cidades')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={save}
                    aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                    aoClicarEmSalvarEVoltar={saveAndClose}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave} >
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}
                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="Nome" disabled={isLoading} name='nome' onChange={e => setNome(e.target.value)} />
                            </Grid>
                        </Grid>

                    </Grid>


                </Box>
            </Form>
        </LayoutBaseDePagina>

    )
}