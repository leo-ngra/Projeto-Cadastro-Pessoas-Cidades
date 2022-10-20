import { Routes, Route, Navigate } from 'react-router-dom'
import Button from "@mui/material/Button";
import { useDrawerContext } from '../shared/contexts/DrawerContext';
import { useEffect } from 'react';

export const AppRoutes = () => {

    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

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
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>} />

            
        </Routes>
    );
}