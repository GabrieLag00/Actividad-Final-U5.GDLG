import React, { useState } from 'react';  // Añadir useState
import { CssBaseline, TextField, Button, AppBar, Toolbar, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';  // Añadir Dialog, DialogTitle, DialogContent, DialogActions
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fondo from './assets/fondo.jpg'; 
import WebFont from 'webfontloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import BinarySearchTree from './components/BinarySearchTree';
import Swal from 'sweetalert2';


// Resto del código...


WebFont.load({
  google: {
    families: ['Poppins:300,400,500,700', 'sans-serif']
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a84ff',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#1e1e1e',
      paper: 'rgba(255,255,255,0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
        InputLabelProps: {
          style: { color: '#fff' },
        },
        InputProps: {
          style: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.09)' },
        },
      },
    },
  },
});

function App() {
  const [tree] = useState(new BinarySearchTree());
  const [nodeValue, setNodeValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNode = () => {
    const value = parseInt(nodeValue, 10);
    if (!isNaN(value)) {
      tree.add(value);
      setNodeValue('');
      Swal.fire('Nodo Añadido', `El nodo ${value} ha sido añadido`, 'success');
    }
  };

  const handleRemoveNode = () => {
    setOpenDialog(true);
  };

  const confirmRemoveNode = () => {
    const value = parseInt(nodeValue, 10);
    if (!isNaN(value)) {
      tree.remove(value);
      setNodeValue('');
      Swal.fire('Nodo Eliminado', `El nodo ${value} ha sido eliminado`, 'info');
    }
    setOpenDialog(false);
  };

  const handleSearchNode = () => {
    const value = parseInt(nodeValue, 10);
    if (!isNaN(value)) {
      const found = tree.contains(value);
      Swal.fire({
        title: found ? 'Nodo Encontrado' : 'Nodo No Encontrado',
        text: `El nodo ${value} ${found ? 'existe' : 'no existe'} en el árbol`,
        icon: found ? 'success' : 'error'
      });
    }
  };

  const handlePrintSize = () => {
    Swal.fire('Tamaño del Árbol', `El tamaño del árbol es ${tree.size()}`, 'info');
  };

  const handlePrintContent = () => {
    Swal.fire('Contenido del Árbol', `El contenido del árbol es: ${tree.toArray()}`, 'info');
  };

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}>
        <Box sx={{
          flex: 1,
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.background.default} 50%, transparent 50%)`,
        }}>
          <AppBar position="fixed" sx={{ backgroundColor: "background.default", width: '100%' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="home">
                <FontAwesomeIcon icon={faHome} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BinarySearchTree
              </Typography>
              <Button color="inherit">Home</Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Box sx={{ width: '100%', maxWidth: 480, mt: 2 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ color: 'white', mb: 2 }}>
              BINARY TREE
            </Typography>
            <Typography variant="overline" display="block" gutterBottom sx={{ color: 'white', mb: 2 }}>
              Start
            </Typography>
            <TextField
          label="Añadir Nodo"
          value={nodeValue}
          onChange={(e) => setNodeValue(e.target.value)}
          sx={{ mb: 2 }}
        />
            <Button variant="contained" color="primary" onClick={handleAddNode} sx={{ mb: 2 }}>
          Añadir
        </Button>
        <TextField
          label="Eliminar Nodo"
          value={nodeValue}
          onChange={(e) => setNodeValue(e.target.value)}
          sx={{ mb: 2 }}
        />
            <Button variant="contained" color="secondary" onClick={handleRemoveNode} sx={{ mb: 2 }}>
          Eliminar
        </Button>

        <TextField
          label="Buscar Nodo"
          value={nodeValue}
          onChange={(e) => setNodeValue(e.target.value)}
          sx={{ mb: 2 }}
        />
            <Button variant="contained" color="secondary" onClick={handleSearchNode} sx={{ mb: 2 }}>
          Buscar
        </Button>
        <Button variant="outlined" color="info" onClick={handlePrintSize} sx={{ mb: 2 }}>
          Imprimir Tamaño
        </Button>

        <Button variant="outlined" color="info" onClick={handlePrintContent} sx={{ mb: 2 }}>
          Imprimir Contenido
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Eliminar Nodo</DialogTitle>
          <DialogContent>
            <Typography>¿Estás seguro de que quieres eliminar el nodo {nodeValue}?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={confirmRemoveNode} color="secondary">Eliminar</Button>
          </DialogActions>
        </Dialog>
            
          </Box>
        </Box>
        <Box
          component="img"
          src={fondo}
          alt="Imagen de fondo"
          sx={{
            width: '50%',
            height: '100vh',
            objectFit: 'cover',
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
