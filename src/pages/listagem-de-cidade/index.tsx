import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";

export const ListagemDeCidade = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    return (
        <div>
            <LayoutBaseDePagina
                titulo='Listagem de cidades'
                barraDeFerramentas={
                    <FerramentasDaListagem
                        mostrarInputBusca
                        textoBotaoNovo="Nova"
                        textoDaBusca={busca}
                        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, {replace: true})}
                        />}>

            </LayoutBaseDePagina>
        </div>
    )
};