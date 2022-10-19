import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components/menu-lateral";


export const App = () => {
  return (
    <div className="App">
      
      <MenuLateral>
        <AppRoutes />
      </MenuLateral>

    </div>
  );
}
