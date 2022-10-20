import { createContext, useCallback, useContext, useState} from "react";


interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IDrawerOptions {
    icon: string;
    label: string;
    path: string;
}

interface IAppDrawerProviderProps {
    children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

     const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions)
    }, []);

    return (

        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions  }}>
           {children}
        </DrawerContext.Provider>


    )
}
