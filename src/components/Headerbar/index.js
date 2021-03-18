import { AppBar, Grid, Hidden, Toolbar, Typography, Avatar } from "@material-ui/core";
import styles from '../../../styles/Headerbar.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router';


export default function Headerbar() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Squad managment tool</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,800,900&display=swap" />
                <link rel="icon" href="https://venturus.org.br/wp-content/uploads/2019/07/cropped-favicon-32x32.png" sizes="32x32" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <AppBar position="absolute" className={styles.header} >
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <div className={styles.header__title__container}>
                                <div className={styles.header__logo} onClick={() => { router.push('/')}} />
                                <Typography type="title" color="inherit" style={{ flex: 1 }}>
                                    Squad Managment tool
                                </Typography>
                            </div>
                        </Grid>
                        <Hidden only="xs">

                            <Grid item xs>
                                <div className={styles.header__username__container}>
                                    <div className={styles.username}>
                                        <Typography type="h6" color="inherit" align="justify" style={{ flex: 1, padding: 5 }} >
                                            Matheus Francisco
                                        </Typography>
                                        <Avatar>MF</Avatar>
                                    </div>
                                </div>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>

    )

}