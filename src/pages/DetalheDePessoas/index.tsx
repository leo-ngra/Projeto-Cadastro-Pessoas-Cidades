
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup'

import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe";
import { VTextField } from "../../shared/form/VTextField";
import { useForm } from "../../shared/hooks/useForm";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { PessoasService } from "../../shared/services/api/PessoasService";

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required('Campo é obrigatório.').min(3, 'O campo precisa ter pelo menos 3 caracteres.'),
    email: yup.string().required().email(),
    cidadeId: yup.number().required(),
});

export const DetalheDePessoas = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/pessoas')
                    } else {
                        setNome(result.nomeCompleto)

                        formRef.current?.setData(result)
                    }
                })
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: '',
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true)

                if (id === 'nova') {
                    PessoasService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false)

                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate(`/pessoas`)
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`)
                                }
                            }
                        })
                } else {
                    PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false)

                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate(`/pessoas`)
                                }
                            }
                        })
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {};

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
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/pessoas')
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={save}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
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
                                <VTextField fullWidth label="Nome completo" disabled={isLoading} name='nomeCompleto' onChange={e => setNome(e.target.value)} />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="Email" disabled={isLoading} name='email' />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="Cidade" disabled={isLoading} name='cidadeId' />
                            </Grid>
                        </Grid>

                    </Grid>


                </Box>
            </Form>
        </LayoutBaseDePagina>

    )
}