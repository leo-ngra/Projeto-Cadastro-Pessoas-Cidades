import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDrawerContext } from "../../contexts/DrawerContext";
import { useAppThemeContext } from "../../contexts/ThemeContext";

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to)
        onClick?.()
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton >
    )
}

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
    const { toggleTheme } = useAppThemeContext();
    const { logout } = useAuthContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
                    <Box
                        width='100%'
                        height={theme.spacing(20)}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://avatars.githubusercontent.com/u/107640605?v=4"
                        />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    to={drawerOptions.path}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>s
                                </ListItemIcon>
                                <ListItemText primary='Alternar Tema' />
                            </ListItemButton >
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <Icon>logout</Icon>s
                                </ListItemIcon>
                                <ListItemText primary='Sair' />
                            </ListItemButton >
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)} >
                {children}
            </Box>
        </>
    )
}