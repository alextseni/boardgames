export const styles = {
  board : {
    margin: 'inherit',
    height:100,

  },
  tile: {
    border: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    backgroundColor: '#424242',

  },
  marble: {
    backgroundColor: '#E0E0E0',
    height: 50,
    width: 50,
    textAlign: 'center',
    cursor: 'pointer',
  },
  obstacle: {
    backgroundColor: '#A1887F',
    height: 50,
    width: 50,
    textAlign: 'center',
  },
  selected: {
    Player1:{
      backgroundColor: '#E55B3C',
      height: 50,
      width: 50,
      verticalAlign: 'top',
    },
    Player2:{
      backgroundColor: '#6495ED',
      height: 50,
      width: 50,
      verticalAlign: 'top',
    },

  }

}
