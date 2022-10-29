import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/PessoasService";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { useDebounce } from "../../shared/hooks/useDebounce";

export const ListagemDePessoas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true)

        debounce(() => {
            PessoasService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        console.log(result)

                        setRows(result.data)
                        setTotalCount(result.totalCount)
                    }
                })
        })
    }, [busca]);

    return (

        <LayoutBaseDePagina
            titulo='Listagem de pessoas'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />}>
            
            <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                        <TableCell>Ações</TableCell>
                        <TableCell>{row.nomeCompleto}</TableCell>
                        <TableCell>{row.email}</TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>

    )
};