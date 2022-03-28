import React, { ChangeEvent, useEffect, useState } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { images } from "../../styles/images";
import background from '../../assets/backgroud.png';
import { colors } from "../../styles/colors";
import { TextInput } from "react-native-paper";
import { Button, Icon } from '@ui-kitten/components';
import { useAuth } from "../../hooks/useAuth";
import { fonts } from "../../styles/font";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useAuth();

    return (
        <SafeAreaView>
            <ImageBackground
                source={background}
                style={styles.imageBackgroud}
            >
                <Image source={images.logo} style={styles.logo} />

                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Bem-vindo</Text>
                        <Text style={styles.subtitle}>Insira os seus dados para acessar</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            label="Email"
                            value={email}
                            onChangeText={email => setEmail(email)} />
                        <TextInput
                            style={styles.input}
                            label="Senha"
                            value={password}
                            onChangeText={password => setPassword(password)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon onPress={() => setShowPassword(!showPassword)} name={showPassword ? "eye" : "eye-off"} />}
                        />

                        <Button style={styles.buttonLogin} onPress={() => signIn(email, password)}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>
                    </View>
                </View>

            </ImageBackground>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: 385,
        width: 339,
        marginTop: 87,
        borderRadius: 8,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12)',
        padding: 20,
    },
    imageBackgroud: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",

    },
    logo: {
        marginTop: 52
    },
    title: {
        fontFamily: fonts.spartaBold,
        fontSize: 24,
        color: colors.black,
    },
    subtitle: {
        fontFamily: fonts.spartaMedium,
        fontSize: 14,
        fontStyle: "normal",
        lineHeight: 30,
        color: colors.black,
    },
    input: {
        marginTop: 20,
    },
    buttonLogin: {
        backgroundColor: colors.darkBlue,
        height: 56,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: fonts.spartaBold,
        fontSize: 16,
    }
});

export default Login;