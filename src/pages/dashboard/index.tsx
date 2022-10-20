import { BarraDeFerramentas } from "../../shared/components/barra-de-ferramentas"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"

export const Dashboard: React.FC = () => {

    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={(
                <BarraDeFerramentas
                    mostrarInputBusca
                    textoBotaoNovo="Novo"
                />
            )}

        >
            Testando
        </LayoutBaseDePagina>
    )
}