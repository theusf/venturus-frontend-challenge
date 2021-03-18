import '../styles/globals.css'
import HeaderBar from '../src/components/Headerbar'
import { ThemeProvider } from '@material-ui/core/styles';
import mytheme from '../src/theme'

function MyApp({ Component, pageProps }) {
  return (<ThemeProvider theme={mytheme}>
    <HeaderBar />
    <Component {...pageProps} />
  </ThemeProvider>)
}

export default MyApp
