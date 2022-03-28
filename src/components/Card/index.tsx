import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/font';
import { formatName, getGradientColor, urlImage } from '../../Utils';

type PokemonType = {
    type: {
        name: string;
    }
}

type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonType[];
}

type CardProps = {
    data: Pokemon;
} & TouchableOpacityProps


export function Card({ data, ...rest }: CardProps) {

    return (
        <TouchableOpacity {...rest}>
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0.6, y: 0 }}
                    colors={getGradientColor(data.types[0].type.name)}
                    style={styles.backgroud}
                />
                <View style={styles.pokemonView}>
                    <Image
                        style={styles.pokemonImage}
                        source={
                            {
                                uri: urlImage(data.id)
                            }
                        }
                    />
                    <View style={styles.contentNamePokemon}>
                        <Text style={styles.namePokemon}>{formatName(data.name)}</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 147,
        height: 96,
        marginVertical: 25,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroud: {
        position: 'absolute',
        borderRadius: 20,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    pokemonView: {
        width: 147,
        height: 140,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pokemonImage: {
        width: '70%',
        height: '70%',
        marginTop: -80,

    },
    contentNamePokemon: {
        position: 'absolute',
        width: 122,
        height: 22,
        bottom: 32,
        backgroundColor: colors.nameBox,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    namePokemon: {
        fontFamily: fonts.spartaExtraBold,
        fontSize: 12,
        color: colors.white,
    }
})