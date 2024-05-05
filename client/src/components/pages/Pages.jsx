import SighUp from '../auth/signUp/SignUpForm.jsx'
import SignIn from '../auth/signIn/SignInForm.jsx'
import Home from '../home/Home.jsx'


const BuildPage = (index) => (
    index  
)

export const PageLogin = ({theme, setTheme}) => BuildPage(<SignIn theme={theme} setTheme={setTheme}/>)
export const PageRegister = ({theme, setTheme}) => BuildPage(<SighUp theme={theme} setTheme={setTheme}/>)
export const PageHome = ({theme, setTheme}) => BuildPage(<Home theme={theme} setTheme={setTheme}/>)
// export const PageAccount = ({theme, setTheme}) => BuildPage(<Account theme={theme} setTheme={setTheme}/>)
// export const PageMap = ({theme, setTheme}) => BuildPage(<Map theme={theme} setTheme={setTheme}/>)
// export const PageFavourite = ({theme, setTheme}) => BuildPage(<Favourite theme={theme} setTheme={setTheme}/>)
// export const PageRoute = ({theme, setTheme}) => BuildPage(<Route theme={theme} setTheme={setTheme}/>)