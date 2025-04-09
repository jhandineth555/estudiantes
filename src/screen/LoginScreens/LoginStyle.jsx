import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create ({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      card: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
      },
      image: {
        width: 90,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
      },
      title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#517fa4',
        borderRadius: 10,
      },
      auth: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
})
export default LoginStyle;