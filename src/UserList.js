import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import confetti from 'canvas-confetti';

function UserList({ userList }) {
  const [debounceTimeouts] = useState({});
  const [open, setOpen] = React.useState(false);
  const [userStates, setUserStates] = useState({});
  useEffect( () => {
    setUserStates(
      userList.reduce((acc, user) => {
        acc[user.line] = user;
        return acc;
      }, {})
    );
  }, [userList]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNoteChange = (line, value) => {
    setUserStates((prevStates) => ({
      ...prevStates,
      [line]: {
        ...prevStates[line],
        notes: value,
        lastModified: Date.now(),
      },
    }));
    const key = `l${line}`;
    if (debounceTimeouts[key]) {
      clearTimeout(debounceTimeouts[key]);
    }

    debounceTimeouts[key] = setTimeout(() => {
      const lastModifiedTimestamp = userStates[line].lastModified;
      if (Date.now() - lastModifiedTimestamp >= 2000) {
        fetch(`https://5settembre.it/api/line/${line}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userStates[line],
            notes: value,
          }),
        })
      }
    }, 2000);
  };

  const handleChange = (line, what) => {
    const inverse = !userStates[line][what];
    if (what === 'checked' && inverse) {
      confetti();
    }
    setUserStates((prevStates) => ({
      ...prevStates,
      [line]: {
        ...prevStates[line], 
        [what]: inverse,
      },
    }));
    fetch(`https://5settembre.it/api/line/${line}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userStates[line],
        [what]: inverse,
      }),
    })
  }

  return (
    <div>
      {userList.map((user) => (
        <p key={user.line} className="users" onClick={() => handleChange(user.line, 'checked')}>
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fontSize: '8vmin' } }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={Boolean(userStates[user.line]?.checked)}
            />
            {user.name}
        </p>
      ))}
      <Button variant="text" size="large" onClick={handleClickOpen} className="button">
        Dettagli per catering
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Verifica i dati</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Controlla la tabella qui sotto.
            Aggiornala per informarci di intolleranze, allergie, bambini di età inferiore ai 5 anni o tra i 5 e i 10 anni.
            Puoi usare il campo di testo a destra per indicare qualunque altra cosa.
            <ArrowForwardIcon />
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table stickyHeader size="large">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Celiachia</TableCell>
                  <TableCell>Lattosio</TableCell>
                  <TableCell>0-5 anni</TableCell>
                  <TableCell>5-10 anni</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow
                    key={user.line}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={Boolean(userStates[user.line]?.gluten)}
                        onChange={() => {handleChange(user.line, 'gluten')}}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={Boolean(userStates[user.line]?.lactose)}
                        onChange={() => {handleChange(user.line, 'lactose')}}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={Boolean(userStates[user.line]?.under5)}
                        onChange={() => {handleChange(user.line, 'under5')}}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={Boolean(userStates[user.line]?.bet5and10)}
                        onChange={() => {handleChange(user.line, 'bet5and10')}}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        className="notes"
                        margin="dense"
                        label="Altre note"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userStates[user.line]?.notes}
                        onChange={(event) => {handleNoteChange(user.line, event.target.value)}}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="text" size="large" onClick={handleClose} className="button">Conferma</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
