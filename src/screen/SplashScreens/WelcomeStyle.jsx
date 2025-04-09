import { StyleSheet } from "react-native";

const WelcomeStyle = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 200,
        textAlign: 'center',
      },
      overlay: {
        backgroundColor: "rgb(255, 255, 255)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        color: "#fff",
        fontSize: 24,
        marginBottom: 20,
      },
});
export default WelcomeStyle;