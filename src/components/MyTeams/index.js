import { Divider, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import cardStyles from '../../../styles/Card.module.css'
import myTeamsStyles from '../../../styles/MyTeams.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

export default function index() {
  
  const router = useRouter();
  const [teams, setTeams] = useState([])

  const getTeams = async () => {
    return await fetch('/api/teams').then((ret) => ret.json())
  }

  useEffect(async () => {
    const result = await getTeams()
    setTeams(result)
  }, [])

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        border: 0,
        '& .MuiDataGrid-colCell		': {
          backgroundColor: 'white'
        },
        '& .MuiDataGrid-footer		': {
          visibility: 'hidden',
        },
      },
    }),
  );

  const classes = useStyles();

  const deleteRow = (id) => {
    const aux = teams.filter(value => value.id != id)
    setTeams([...aux])
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: '', headerName: '', flex: 1,
      renderCell: (params) => (
        <div className={myTeamsStyles.myteams__datatable__actions__container}>
          <Typography color="textSecondary" >
            <Tooltip title="Delete" aria-label="delete" onClick={() => {
              deleteRow(params.row.id)
            }}>
              <IconButton size="small" color="primary"><DeleteIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Share" aria-label="share">
              <IconButton size="small" color="primary"><ShareIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Edit" aria-label="add" onClick={() => {
              router.push(`/create?teamid=${params.row.id}`);
            }}>
              <IconButton size="small" color="primary"><EditIcon /></IconButton>
            </Tooltip>
          </Typography>
        </div>
      )
    },

  ];

  return (
    <Paper elevation={2} className={cardStyles.card__big}>
      <div className={cardStyles.card__title__row}>
        <h1 className={cardStyles.card__title}>
          My teams
          </h1>
        <div className={myTeamsStyles.myteams__addiconbutton__container} aria-label="add team">
          <IconButton disableRipple disableFocusRipple onClick={() => {
            router.push(`/create`);
          }}>
            <AddIcon className={myTeamsStyles.myteams__addiconbutton} />
          </IconButton>
        </div>
      </div>

      <Divider />

      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          paging={false}
          rows={teams}
          columns={columns}
          pageSize={30}
          className={classes.root}
          options={{
            paging: false
          }}
        />
      </div>

    </Paper>

  )
}
