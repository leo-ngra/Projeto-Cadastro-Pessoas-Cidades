import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components/MenuLateral";


export const App = () => {
  return (
    <div className="App">
      
      <MenuLateral>
        <AppRoutes />
      </MenuLateral>

    </div>
  );
}
 