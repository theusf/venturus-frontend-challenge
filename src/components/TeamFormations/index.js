import { useState } from 'react'
import styles from '../../../styles/TeamFormation.module.css'
import { Tooltip } from '@material-ui/core'

export default function index({ players = [], handleDisablePlayer }) {

    const [teamFormation, setTeamFormation] = useState({
        atacante1: '',
        centroavante: '',
        atacante2: '',
        meia: '',
        meiadireita: '',
        volante: '',
        meiaesquerda: '',
        zagueiro1: '',
        zagueiro2: '',
        zagueiro3: '',
        goleiro: ''
    })


    const handleDragOver = (e) => {
        e.dataTransfer.dropEffect = "move";

        e.preventDefault();
    };


    const handleDrop = (e, type) => {

        const id = e.dataTransfer.getData('player_id')
        console.log(id)

        const player = players.find(x => x.id == id)

        console.log("Dropou", player.name)
        player.initials = getInitials(player.name)

        const aux = teamFormation;
        teamFormation[type] = player

        handleDisablePlayer(player)
        setTeamFormation({ ...aux })
    }

    const getInitials = (name) => {
        const splitted_names = name.split(" ")

        const firstname = splitted_names[0]
        const lastname = splitted_names[splitted_names.length - 1]

        return `${firstname[0]}${lastname[0]}`
    }

    const renderPlayerSpot = (type) => {
        return (
            <div className={styles.formation__player__dropbox__outter} onDrop={(e) => handleDrop(e, type)} onDragEnter={(e) => console.log('Entrou no drag over')} onDragOver={handleDragOver}>
                {/* Winger 1*/}
                <Tooltip title={teamFormation[type].name || '' }>
                    <div className={styles.formation__player__dropbox}>
                        <strong className={styles.formation__player__initials}>{teamFormation[type] ? teamFormation[type].initials : '+'}</strong>
                    </div>
                </Tooltip>
            </div>
        )
    }

    return (
        <div className={styles.formation__container}>

            <div className={styles.formation__container__row} >
                {renderPlayerSpot('atacante1')}

                {renderPlayerSpot('centroavante')}

                {renderPlayerSpot('atacante2')}

            </div>

            <div className={styles.formation__container__row} >
                {renderPlayerSpot('meia')}
            </div>

            <div className={styles.formation__container__row} >

                {renderPlayerSpot('meiaesquerda')}

                {renderPlayerSpot('volante')}

                {renderPlayerSpot('meiadireita')}

            </div>

            <div className={styles.formation__container__row} >

                {renderPlayerSpot('zagueiro1')}

                {renderPlayerSpot('zagueiro2')}

                {renderPlayerSpot('zagueiro3')}

            </div>

            <div className={styles.formation__container__row} >

                {renderPlayerSpot('goleiro')}



            </div>

        </div>

    )
}
