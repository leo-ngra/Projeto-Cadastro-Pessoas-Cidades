import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts/DrawerContext';
import { Dashboard } from '../pages/Dashboard';
import { ListagemDePessoas } from '../pages/ListagemDePessoas';
import { DetalheDePessoas } from '../pages/DetalheDePessoas';
import { DetalheDeCidades } from '../pages/DetalheDeCidades';
import { ListagemDeCidades } from '../pages/ListagemDeCidades';

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext()

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            },
            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
            },
            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            },
        ])
    }, [])
    
    return (
        <Routes>
           <Route path='/pagina-inicial' element={ <Dashboard /> } />

           <Route path='/pessoas' element={ <ListagemDePessoas /> } />
           <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas /> } />

           <Route path='/cidades' element={ <ListagemDeCidades /> } />
           <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades /> } />

           <Route path='*' element={<Navigate to='/pagina-inicial' /> } />
            
        </Routes>
    );
}