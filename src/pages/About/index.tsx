import { Tabs } from "@ant-design/react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import arrowBack from '../../assets/arrow_back.png';
import { CardType } from "../../components/CardType";
import { AppStackParams } from "../../routes/app.routes";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/font";
import { formatIdPokemon, formatName, getColorPerType, getGradientColor, urlImage } from "../../Utils";

interface Pokemon {
    name: string;
    url: string;
    id: number;
    types: PokemonType[];
    species: {
        name: string;
    },
    height: number;
    moves: MovesBattle[];
}

interface PokemonType {
    type: {
        name: string;
    }
}

interface RouteParams {
    pokemon: Pokemon;
}

interface MovesBattle {
    move: {
        name: string;
    }
}

export function About() {
    const route = useRoute();
    const navigator = useNavigation<NativeStackNavigationProp<AppStackParams>>();
    const { pokemon } = route.params as RouteParams;

    const tabsName = [
        {
            title: 'Sobre',
        },
        {
            title: 'Status',
        },
        {
            title: 'Evolução',
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigator.goBack()}>
                    <Image style={styles.back} source={arrowBack} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentName}>
                <Text style={styles.namePokemon}>{formatName(pokemon.name)}</Text>
                <Text style={styles.numberPokemon}>{formatIdPokemon(pokemon.id)}</Text>
            </View>
            <View style={styles.contentType}>
                {pokemon.types.map((t) => (
                    <CardType
                        key={t.type.name}
                        type={t.type.name}
                        colors={getGradientColor(t.type.name)}
                    />
                ))}
            </View>
            <View style={styles.contentImage}>
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0.6, y: 0 }} colors={getGradientColor(pokemon.types[0].type.name)} style={styles.backgroud} />
                <Image style={styles.imagePokemon} source={{ uri: urlImage(pokemon.id) }} />
            </View>
            <View style={styles.contentTabBar}>
                <Tabs
                    tabs={tabsName}
                    tabBarUnderlineStyle={
                        {
                            backgroundColor: getColorPerType(pokemon.types[0].type.name),
                            height: 3,
                        }
                    }
                    tabBarTextStyle={styles.tabBarText}
                >
                    <View style={styles.tabView}>
                        <View style={styles.viewTabTitle}>
                            <View style={styles.contentTabTitleText}>
                                <Text style={styles.textTitleTab}>
                                    Espécie
                                </Text>
                            </View>
                            <View style={styles.contentTabTitleText}>
                                <Text style={styles.textTitleTab}>
                                    Tamanho
                                </Text>
                            </View>
                            <View style={styles.contentTabTitleText}>
                                <Text style={styles.textTitleTab}>
                                    Habilidades
                                </Text>
                            </View>
                            <View style={styles.contentTabTitleText}>
                                <Text style={styles.textTitleTab}>
                                    Gênero
                                </Text>
                            </View>
                        </View>
                        <View style={styles.viewTabProp}>
                            <View style={styles.contentTabPropText}>
                                <Text style={styles.textPropTab}>
                                    {formatName(pokemon.species.name)}
                                </Text>
                            </View>
                            <View style={styles.contentTabPropText}>
                                <Text style={styles.textPropTab}>
                                    {pokemon.height}
                                </Text>
                            </View>
                            <View style={styles.contentTabPropText}>
                                <ScrollView horizontal>
                                    {pokemon.moves.map((m, i, arr) => (
                                        <Text key={m.move.name} style={styles.textPropScroll}>
                                            {
                                                arr.length - 1 === i ?
                                                    m.move.name.replace('-', ' ')
                                                    :
                                                    m.move.name.replace('-', ' ').concat(',')
                                            }
                                        </Text>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={styles.contentTabPropText}>
                                <Text style={styles.textPropTab}>
                                    Fem
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tabView}></View>
                    <View style={styles.tabView}></View>
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        margin: 23,
        height: 30,
    },
    back: {
        height: 24,
        width: 24,
    },
    contentName: {
        marginHorizontal: 23,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    namePokemon: {
        fontFamily: fonts.spartaBold,
        fontSize: 24,
        color: colors.textPokemon,
    },
    numberPokemon: {
        fontFamily: fonts.spartaBold,
        fontSize: 16,
        color: colors.textPokemon,
    },
    contentType: {
        marginVertical: 20,
        marginHorizontal: 23,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    contentImage: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    backgroud: {
        position: 'relative',
        width: 324,
        height: 190,
        borderRadius: 20,
        zIndex: -1,
        top: 50,
    },
    imagePokemon: {
        position: 'absolute',
        zIndex: 1,
        width: 260,
        height: 260,
        top: -35,

    },
    contentTabBar: {
        flex: 1,
        marginTop: 80,
        paddingHorizontal: 7
    },
    tabView: {
        height: '100%',
        backgroundColor: '#fff',
        marginHorizontal: 26,
        marginVertical: 20,
        flexDirection: 'row'
    },
    tabBarText: {
        fontFamily: fonts.spartaBold,
        fontSize: 14,
    },
    viewTabTitle: {
        height: '100%',
        width: 129,
    },
    contentTabTitleText: {
        height: 30,
        width: 129,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 7,
    },
    textTitleTab: {
        fontFamily: fonts.spartaBold,
        fontSize: 14,
        color: colors.textTitleTabBar
    },
    viewTabProp: {
        height: '100%',
        width: '100%',
    },
    contentTabPropText: {
        height: 30,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 7,
    },
    contentTabPropTextScroll: {
        height: 30,
        marginVertical: 7,
    },
    textPropTab: {
        fontFamily: fonts.spartaSemiBold,
        fontSize: 13,
        color: colors.textPropTabBar,
    },
    textPropScroll: {
        fontFamily: fonts.spartaSemiBold,
        fontSize: 13,
        color: colors.textPropTabBar,
        marginRight: 5,
    },
});