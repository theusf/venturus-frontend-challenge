import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import cardStyles from '../../../styles/Card.module.css'
import styles from '../../../styles/AverageRank.module.css'

import { Divider, Paper } from '@material-ui/core';

export default function index() {

    const [highestAvg, setHighestAvg] = useState([])
    const [lowestAvg, setLowestAvg] = useState([])

    const getHighestAvg = async () => {
        const result = await fetch('/api/highavg').then((ret) => ret.json())
        setHighestAvg(result)
    }
    const getLowestAvg = async () => {
        const result = await fetch('/api/lowavg').then((ret) => ret.json())
        setLowestAvg(result)
    }

    useEffect(() => {
        getLowestAvg()
        getHighestAvg()
    }, [])

    const item = () => {
        return (
            <div className={styles.item}>

            </div>
        )
    }

    return (
        <div>
            <Paper elevation={3} className={cardStyles.card}>
                <h1 className={cardStyles.card__title}>
                    Top 5
                </h1>

                <Divider />

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md>
                        <h4 className={styles.subtitle}>Highest avg age</h4>

                        <div className={styles.list__container}>
                            {highestAvg.map((item, index) => {
                                return <div key={`${index}__${item.name}`} className={styles.list__item}> <span> {item.name}</span> <span> {item.avg_age}</span></div>
                            })}
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md>
                        <h4 className={styles.subtitle}>Lowest avg age</h4>

                        <div className={styles.list__container}>
                            {lowestAvg.map((item) => {
                                return <div key={`${index}__${item.name}`}  className={styles.list__item}> <span> {item.name}</span> <span> {item.avg_age}</span></div>
                            })}
                        </div>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}
