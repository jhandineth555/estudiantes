import { StyleSheet } from "react-native";
const ProfileStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#rgb(128,128,128)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },  
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    card: {
      width: '110%',
      height: 'auto',
      padding: 20,
      borderRadius: 10,
      marginTop: -100,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 10,
    },
    error: {
      color: 'red',
      marginBottom: 8,
    },
    img: {
      width: 350,
      height: 250, 
      resizeMode: 'contain',
      marginTop: 100,
    },
    table: {
      borderWidth: 1,
      borderColor: '#ccc',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableHeader: {
      flex: 1,
      padding: 8,
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
      borderWidth: 1,
      borderColor: '#ccc',
      textAlign: 'center',
    },
    tableCell: {
      flex: 1,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      textAlign: 'center',
    },
    alternateRow: {
      backgroundColor: '#f9f9f9',
    },
    avatar: {
      height: 155,
      width: 155,
      borderRadius: 999,
      borderWidth: 1,
      marginBottom: 10,
      marginTop: 20,

    },
    buttonContainer: {
      flex: 1,
      marginHorizontal: 5,
    },
    buttonStyle: {
      backgroundColor: '#2089dc',
    },
    centeredText: {
      marginTop: 15,
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold', 
    },
    tabView: {
      marginTop: 50,
    },
  });
  
  export default ProfileStyle;
  