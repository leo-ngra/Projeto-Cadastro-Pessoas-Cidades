import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";

export const DetalheDePessoas = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Save')
    } 
    const handleDelete = () => {
        console.log('Delete')
    } 

    return (
        <LayoutBaseDePagina
            titulo='Detalhe de pessoa'
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                textoBotaoNovo='Nova'
                mostrarBotaoSalvarEVoltar
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}

                aoClicarEmSalvar={handleSave}
                aoClicarEmSalvarEVoltar={handleSave}
                aoClicarEmApagar={handleDelete}
                aoClicarEmVoltar={() => navigate('/pessoas')}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <p>Detalhe de Pessoas {id}</p>
        </LayoutBaseDePagina>

    )
}