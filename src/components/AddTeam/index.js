import { Button, Chip, Divider, FormControlLabel, Radio, RadioGroup, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import cardStyles from '../../../styles/Card.module.css'
import addTeamStyles from '../../../styles/AddTeam.module.css'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import TeamFormation from '../TeamFormations'
import { useRouter } from 'next/router'

export default function index() {

    const router = useRouter()
    const { register, handleSubmit, errors, setValue } = useForm(); // initialise the hook
    const [teamTypeValue, setTeamTypeValue] = useState('real');
    const [teamTags, setTeamTags] = useState(['team-tag'])
    const [AllPlayers, setAllPlayers] = useState([])
    const [team, setTeam] = useState()
    const [filtredPlayers, setFiltredPlayers] = useState(AllPlayers)
    const [selectedPlayers, setSelectedPlayers] = useState([])

    useEffect(async () => {
        const { teamid } = router.query

        const url = (teamid ? `/api/players?teamid=${teamid}` : '/api/players')
        const players = await fetch(url).then((ret) => ret.json())
        setAllPlayers(players)
        setFiltredPlayers(players.slice(0, 5))

        if (teamid) {
            const teams = await fetch('/api/teams').then((ret) => ret.json())
            const team = teams.find(value => value.id == teamid);

            setTeam(team)
            setTeamTags(team.tags)
            setTeamTypeValue(team.type)
        }
    }, [])

    useEffect(() => {
        setFiltredPlayers(AllPlayers.slice(0, 5))
    }, [AllPlayers])

    const handleDragStart = (e, player_id) => {
        e.dataTransfer.setData('player_id', player_id);
    };


    const handleDragOver = (e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
    };

    const onSubmit = (data) => {
        console.log(data);
        alert(`${JSON.stringify(data)} ${JSON.stringify(selectedPlayers)}`)
    };

    const onChangeValue = (event) => {
        setTeamTypeValue(event.target.value)
        setValue("teamtype", event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            addTag(event.target.value)
            event.target.value = ''
        }
    }

    const addTag = (value) => {
        const current_tags = [...teamTags];
        current_tags.push(value)
        setTeamTags(current_tags)
    }

    const removeTag = (index) => {
        const current_tags = [...teamTags];
        current_tags.splice(index, 1);
        setTeamTags(current_tags)
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        if (value === '')
            return setFiltredPlayers([])
        const regex = new RegExp(value, 'i')
        setFiltredPlayers(AllPlayers.filter(player => regex.test(player.name)))
    }

    const handleDisablePlayer = (player) => {
        const selected_players_copy = selectedPlayers

        const aux = AllPlayers.map(value => {
            if (player.id == value.id) {
                value.disabled = true;
                selected_players_copy.push(value)
            }
              
            return value
        })

        setAllPlayers(aux)
        setSelectedPlayers([...selected_players_copy])
    }



    return (
        <Paper elevation={3} className={cardStyles.card__page}>
            <h1 className={cardStyles.card__title}>
                Create your team
            </h1>
            <Divider />

            <h4 className={addTeamStyles.section__subtitle}>
                TEAM INFORMATION
            </h4>

            <form className={addTeamStyles.form__container} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md >
                        <div className={cardStyles.card}>

                            <label className={errors.name ? addTeamStyles.form__label__invalid : addTeamStyles.form__label}>
                                Team name
                            </label>
                            <input
                                name="name"
                                placeholder="Insert team name"
                                value={(team ? team.name : undefined)}
                                ref={register({ required: true })}
                                className={errors.name ? addTeamStyles.form__input__invalid : addTeamStyles.form__input}
                            />

                            <label className={addTeamStyles.form__label}>Description</label>
                            <textarea
                                rows={20}
                                name="description"
                                value={(team ? team.description : undefined)}
                                ref={register}
                                className={addTeamStyles.form__input}
                                type="textarea"
                            />


                        </div>

                    </Grid>

                    <Grid item xs={12} sm={6} md>
                        <div className={cardStyles.card}>

                            <label className={errors.website ? addTeamStyles.form__label__invalid : addTeamStyles.form__label}>
                                Team website
                            </label>
                            <input
                                name="website"
                                placeholder="https://myteam.com/"
                                value={(team ? team.website : undefined)}
                                ref={register({ required: true, pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ })}
                                className={errors.website ? addTeamStyles.form__input__invalid : addTeamStyles.form__input}
                            />
                            {errors.teamtype && <p> * Invalid URL</p>}



                            <div className={addTeamStyles.form__section__margin}>
                                <label className={errors.teamtype ? addTeamStyles.form__label__invalid : addTeamStyles.form__label}>
                                    Team type
                                </label>

                                <RadioGroup className={addTeamStyles.form__teamTypes__container} row aria-label="teamtype" name="teamtype" value={teamTypeValue} onChange={onChangeValue} ref={register("teamtype", { required: true })}>
                                    <FormControlLabel value="real" control={<Radio name="teamType" color="primary" />} label="Real" />
                                    <FormControlLabel value="fantasy" control={<Radio name="teamType" color="primary" />} label="Fantasy" />
                                </RadioGroup>

                                <label className={addTeamStyles.form__label}>Team tags</label>

                                <div className={addTeamStyles.form__tags__container}>
                                    {
                                        teamTags.map((tag, index) => {
                                            return (<Chip className={addTeamStyles.tags} key={`${tag}${index}`} color="primary" label={tag}
                                                onDelete={() => { removeTag(index) }} />)
                                        })
                                    }
                                    <input className={addTeamStyles.form__input__invisible} onKeyDown={handleKeyDown} />
                                </div>
                            </div>
                        </div>
                    </Grid>


                    <h4 className={addTeamStyles.section__subtitle}>
                        CONFIGURE SQUAD
                    </h4>

                    <Grid item xs={12} sm={6} md >
                        <div className={cardStyles.card}>

                            <label className={errors.formation ? addTeamStyles.form__label__invalid : addTeamStyles.form__label}>
                                Formation
                            </label>

                            <select className={addTeamStyles.form__select__input}>
                                <option value="3-4-3">3 - 4 - 3</option>
                            </select>



                            <div className={addTeamStyles.form__team__formation}>
                                <TeamFormation players={AllPlayers} handleDisablePlayer={handleDisablePlayer} />
                            </div>

                            <Button className={addTeamStyles.form__submit__button} type="submit" variant="contained" color="primary">
                                SAVE
                                </Button>

                        </div>

                    </Grid>

                    <Grid item xs={12} sm={6} md>
                        <div className={cardStyles.card}>

                            <label className={errors.player ? addTeamStyles.form__label__invalid : addTeamStyles.form__label}>
                                Search player
                            </label>
                            <input
                                name="search players"
                                placeholder="Ronal.."
                                className={addTeamStyles.form__input}
                                onChange={handleSearchChange}
                            />

                            <div>
                                {
                                    filtredPlayers.map((player, index) => {
                                        return (
                                            <div
                                                key={`${player.name}${index}`}
                                                draggable
                                                className={addTeamStyles.form__player__container}
                                                onDragStart={(e) => handleDragStart(e, player.id)}
                                                onDragOver={handleDragOver}
                                                disabled={player.disabled}
                                            >
                                                <div className={addTeamStyles.form__player__container__info}>
                                                    <span><strong>Name:</strong> {player.name}</span>
                                                    <span><strong>Age:</strong>  {player.age}</span>
                                                </div>
                                                <div>
                                                    <strong>Nacionality:</strong> <span>{player.nacionality}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>



                        </div>

                        <Divider />

                    </Grid>


                </Grid>




            </form>

        </Paper >
    )
}
