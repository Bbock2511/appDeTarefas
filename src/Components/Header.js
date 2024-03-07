import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const heightOfStatusBar = Constants.statusBarHeight;

const Header = () => {
    return (
        <View style={styles.head}>
            <Text style = {styles.txtHead}>Lista de tarefas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: '#000000',
        alignContent: 'center',
        marginTop: heightOfStatusBar,
    },
    txtHead: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;