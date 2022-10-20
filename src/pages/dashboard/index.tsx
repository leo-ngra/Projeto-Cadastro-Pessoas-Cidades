import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"

export const Dashboard: React.FC = () => {

    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={(
                <FerramentasDeDetalhe mostrarBotaoSalvarEVoltar />
            )}
        >
            Testando
        </LayoutBaseDePagina>
    )
}