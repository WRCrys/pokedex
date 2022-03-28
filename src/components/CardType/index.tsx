import React from "react";
import { StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/font";

interface CardTypeProps {
    type: string;
    colors: string[];
}

export function CardType(props: CardTypeProps) {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0.6, y: 0 }}
            colors={props.colors}
            style={styles.container}
        >
            <Text style={styles.typePokemon}>{props.type}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        borderRadius: 40,
    },
    typePokemon: {
        marginHorizontal: 12,
        marginVertical: 4,
        fontFamily: fonts.spartaBold,
        fontSize: 14,
        color: colors.white,
    }
})