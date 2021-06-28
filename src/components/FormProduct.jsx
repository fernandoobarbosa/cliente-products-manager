import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Copyright from '../components/Copyright'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Autocomplete from '@material-ui/lab/Autocomplete'
import AddIcon from '@material-ui/icons/Add'
import { app } from '../services/base'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function FormProduct ({ onSubmitNewProduct }) {
  const classes = useStyles()
  const [tags, setTags] = useState({})
  const [imgUrl, setImgUrl] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [tagsArray] = useState([])
  const [newTag, setNewTag] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onSubmitNewProduct({ name, tags, imgUrl, price, description })
  }

  function onChangeTags (event, value) {
    setTags(value)
  }

  const onChangeFile = (event) => {
    const fileValue = event.target.files[0]
    // envio do arquivo para o firebase

    const storageRef = app.storage().ref()
    const ref = storageRef.child(fileValue.name)
    ref.put(fileValue).then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (response) {
        setImgUrl(response)
      })
    })
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangePrice = (event) => {
    setPrice(event.target.value)
  }

  const onChangeNewTagForm = (event) => {
    setNewTag(event.target.value)
  }

  const onClickNewTagButton = (event) => {
    setOpen(false)

    const obj = {
      name: newTag
    }

    tagsArray.push(obj)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddShoppingCartIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          New Product
        </Typography>
        <Grid item xs={12}>
          <input type='file' onChange={onChangeFile} />
        </Grid>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                onChange={onChangeName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='price'
                label='Price'
                name='price'
                autoComplete='price'
                onChange={onChangePrice}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='description'
                multiline
                label='Description'
                rows={7}
                onChange={onChangeDescription}
              />
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                multiple
                limitTags={3}
                id='multiple-limit-tags'
                options={tagsArray}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Tags'
                    placeholder='Tags'
                    value={params.name}
                  />
                )}
                onChange={onChangeTags}
              />
            </Grid>
            <Grid item xs={3}>

              <Button
                variant='contained'
                color='secondary'
                onClick={handleClickOpen}
              >
                <AddIcon />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
              >
                <DialogTitle id='form-dialog-title'>Add</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add a new Tag, please enter a name
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Name'
                    type='text'
                    onChange={onChangeNewTagForm}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary'>
                    Cancel
                  </Button>
                  <Button onClick={onClickNewTagButton} color='primary'>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>

            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            New Product
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
