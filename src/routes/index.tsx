import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts/DrawerContext';
import { useEffect } from 'react';
import { Dashboard } from '../pages/dashboard';

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext()

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página Inicial',
                icon: 'home',
                path: '/pagina-inicial'
            }
        ])
    }, [])
    
    return (
        <Routes>
           <Route path='/pagina-inicial' element={ <Dashboard /> } />

           <Route path='*' element={<Navigate to='/pagina-inicial' /> } />
            
        </Routes>
    );
}