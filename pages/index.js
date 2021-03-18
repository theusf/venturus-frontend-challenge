import styles from '../styles/Home.module.css'
import Grid from '@material-ui/core/Grid';

import MyTeamsCard from '../src/components/MyTeams'
import MostPickedCard from '../src/components/MostPicked'
import AverageRank from '../src/components/AverageRank'

export default function Home() {

  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <Grid container spacing={3} >

          <Grid item xs={12} sm={6} md >
            <MyTeamsCard />

          </Grid>

          <Grid item xs={12} sm={6} md>

            <AverageRank />

            <MostPickedCard />

          </Grid>

        </Grid>

      </main>


      <footer className={styles.footer}>
        <p>Feito com 💚 por <a href="https://github.com/theusf">Matheus Francisco</a></p>
      </footer>

    </div>
  )
}
