import Navegator from "./components/Navegator";
import Wrapper from "./components/Wrapper";
import { useConfig } from "./hooks/useConfig";

function App() {
  const { config, changeThemeMode, changeLang} = useConfig();
  
  return (
    <>
      <Navegator 
        preference = {config.preference}
        translationLiteral = {config.translationLiteral}
        changeThemeMode = {changeThemeMode}
        changeLang = {changeLang}
      />
      <Wrapper
        translationLiteral={config.translationLiteral}
        user = {config.user}
      />
    </>
  )
}

export default App
