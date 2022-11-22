import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";

import { FerramentasDaListagem } from "../../shared/components/FerramentasDaListagem"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { CidadesService } from "../../shared/services/api/CidadesService";
import { PessoasService } from "../../shared/services/api/PessoasService";


export const Dashboard = () => {

    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);

    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        CidadesService.getAll(1)
            .then((result) => {
                setIsLoadingCidades(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountCidades(result.totalCount);
                }
            });

            PessoasService.getAll(1)
            .then((result) => {
                setIsLoadingPessoas(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountPessoas(result.totalCount);
                }
            });
    }, []);

    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={(
                <FerramentasDaListagem mostrarBotaoNovo={false} />
            )}
        >
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} >

                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de Pessoas
                                    </Typography>

                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingPessoas && (
                                            <Typography variant='h1'>
                                                {totalCountPessoas}
                                            </Typography>
                                        )}
                                        {isLoadingPessoas && (
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>

                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} >

                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de Cidades
                                    </Typography>

                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h1'>
                                        {!isLoadingCidades && (
                                            <Typography variant='h1'>
                                                {totalCountCidades}
                                            </Typography>
                                        )}
                                        {isLoadingCidades && (
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    )
}