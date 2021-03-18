import styles from '../styles/Home.module.css'
import AddTeam from '../src/components/AddTeam'


export default function index() {
    return (
        <div className={styles.container}>

            <main className={styles.main}>

                <AddTeam />

            </main>

            <footer className={styles.footer}>
            </footer>

        </div>
    )
}
