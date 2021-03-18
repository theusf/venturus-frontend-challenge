import React, { useEffect, useState } from 'react'
import styles from '../../../styles/MostPicked.module.css'
import cardStyles from '../../../styles/Card.module.css'
import { Grid, Paper, Tooltip } from '@material-ui/core'

export default function index() {

    const [rank, setRank] = useState()

    const getRank = async () => {
        return await fetch('/api/rank').then((ret) => ret.json())
    }

    useEffect(async () => {
        const result = await getRank()
        setRank(result)
    }, [])

    const getInitials = (name) => {
        const splitted_names = name.split(" ")
        const firstname = splitted_names[0]
        const lastname = splitted_names[splitted_names.length - 1]
        return `${firstname[0]}${lastname[0]}`
    }

    const renderPlayer = (player, type) => {
        return (
            <div className={styles.player__avatar__container__column}>
                <h2 className={styles.player__title}>{type}</h2>

                <div className={styles.player__avatar__container__row}>
                    <div className={styles.player__avatar__border}>
                        <Tooltip title={player.name} aria-label="most-picked-player">
                            <div className={styles.player__avatar}>
                                <p className={styles.player__avatar__initials}> {getInitials(player.name)} </p>
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <h2 className={styles.player__percentege__subtitle}>{player.percentage}%</h2>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Paper elevation={2} className={cardStyles.card__gradient__background}>

            <Grid container spacing={8} className={styles.centered__contaier}>

                <Grid item xs={12} sm={12} md >
                    {rank && renderPlayer(rank.mostPicked, 'Most picked player', rank.mostPicked.percentage)}
                </Grid>

                <Grid item xs={12} sm={12} md>
                    {rank && renderPlayer(rank.lessPicked, 'Less picked player', rank.lessPicked)}
                </Grid>

            </Grid>
            
        </Paper>
    )
}
