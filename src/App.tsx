import { SnackbarProvider } from "notistack";
import Navegator from "./components/NavegatorComponent";
import WrapperComponent from "./components/WrapperComponent";
import { useConfig } from "./hooks/useConfig";

function App() {
  const { config, changeThemeMode, changeLang} = useConfig();

  return (
    config.preference != null && config.translationLiteral != null && config.information &&
    <>
      <SnackbarProvider>
        <Navegator 
          preference = {config.preference}
          translationLiteral = {config.translationLiteral}
          changeThemeMode = {changeThemeMode}
          changeLang = {changeLang}
        />
        <WrapperComponent
          translationLiteral={config.translationLiteral}
          information = {config.information}
          preference = {config.preference}
        />
      </SnackbarProvider>
    </>
  )
}

export default App
