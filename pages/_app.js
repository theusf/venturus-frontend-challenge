import '../styles/globals.css'
import HeaderBar from '../src/components/Headerbar'
import Footer from '../src/components/Footer'
import { ThemeProvider } from '@material-ui/core/styles';
import mytheme from '../src/theme'

function MyApp({ Component, pageProps }) {
  return (<ThemeProvider theme={mytheme}>
    <HeaderBar />
    <Component {...pageProps} />
    <Footer/>
  </ThemeProvider>)
}

export default MyApp
