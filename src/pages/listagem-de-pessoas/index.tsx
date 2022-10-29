import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { PessoasService } from "../../shared/services/api/PessoasService";

import { useDebounce } from "../../shared/hooks/useDebounce";

export const ListagemDePessoas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce()

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() => {
            PessoasService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        console.log(result)
                    }
                })
        })
    }, [busca]);

    return (
        <div>
            <LayoutBaseDePagina
                titulo='Listagem de pessoas'
                barraDeFerramentas={
                    <FerramentasDaListagem
                        mostrarInputBusca
                        textoBotaoNovo="Nova"
                        textoDaBusca={busca}
                        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                    />}>

            </LayoutBaseDePagina>
        </div>
    )
};