import { Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logoPokemon from '../../assets/logo-pokemon.png'
import filterIcon from '../../assets/filter.png';
import removeIcon from '../../assets/remove.png';
import { colors } from '../../styles/colors';
import { pokeApi } from '../../services/api';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParams } from '../../routes/app.routes';
import { Drawer } from '@ant-design/react-native';
import { DrawerFilter } from '../../components/DrawerFilter';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MovesBattle, Pokemon, PokemonType } from '../../interfaces/IPokemon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getPokemonsFetch, savePokemons } from '../../store/slices/pokemonsSlice';
import { removeAllFilters, setTypesForSearch, type } from '../../store/slices/typesSlice';
import { fonts } from '../../styles/font';

interface Request {
    id: number;
    types: PokemonType[];
    species: {
        name: string;
    },
    height: number;
    moves: MovesBattle[];
}


const Dashboard = () => {
    const [namePokemon, setNamePokemon] = useState('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loadingMore, setLoadingMore] = useState(true);
    const [offset, setOffSet] = useState(0);

    const navigation = useNavigation<DrawerNavigationProp<AppStackParams>>();

    const screenState = useSelector((state: RootState) => state.pokemons);

    const stateTypesFiltered = useSelector((state: RootState) => state.typesOfPokemos);

    const dispatch = useDispatch();

    useEffect(() => {   

        console.log('casdas')
        getPokemons(offset);
        defaultFilter();
    }, [])

    useEffect(() => {
        if (!namePokemon) {
            setPokemons(screenState.pokemons)
        }
        else {
            const filteredPokemons = pokemons?.filter((p) => (
                p.name.includes(namePokemon.toLowerCase())
            ));

            setPokemons(filteredPokemons);
        }
    }, [namePokemon]);

    useEffect(() => {
        const typesFiltered = stateTypesFiltered.types;
        const types = typesFiltered.filter(i => i.name !== 'all');

        var arrPokemons: Pokemon[] = [];

        if (types) {
            types.map((type) => {
                for (var i = 0; i < pokemons.length; i++) {
                    if (pokemons[i].types[0].type.name === type.name) {
                        arrPokemons.push(pokemons[i])
                    }
                }
            });

            setPokemons(arrPokemons);
        }

        if (typesFiltered.length === 0 || (typesFiltered.length === 1 && typesFiltered[0].name === 'all')) {
            setPokemons(screenState.pokemons);
        }
    }, [stateTypesFiltered])

    async function getPokemons(offset: number): Promise<void> {
        console.log('offset', offset)
        try {
            const response = await pokeApi.get(`/pokemon/?offset=${offset}&limit=20`);
            const { results } = response.data;

            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const { id, types, species, height, moves } = await getMoreInfoAboutPokemonsByUrl(pokemon.url);

                    return {
                        name: pokemon.name,
                        id,
                        types,
                        species,
                        height,
                        moves,
                    }
                })
            );

            // console.log(payloadPokemons)

            dispatch(savePokemons(payloadPokemons));

            setPokemons(oldState => [...oldState, ...payloadPokemons]);

            setOffSet(offset + 20);
        }
        catch (error) {

        }
    }

    async function getMoreInfoAboutPokemonsByUrl(url: string): Promise<Request> {
        const response = await pokeApi.get(url);

        const { id, types, species, height, moves } = response.data as Request;

        return { id, types, species, height, moves };


    }

    function handleNavigationPokemonDetail(pokemon: Pokemon) {
        navigation.navigate('About', {
            pokemon
        });
    }

    function defaultFilter() {
        const type = {
            name: 'all'
        } as type;

        dispatch(setTypesForSearch([type]));
    }

    function removeFilter(filter: string) {
        const filters = stateTypesFiltered.types;

        if (filters.length === 1) {
            defaultFilter();
        }
        else {
            const newFilters = filters.filter(f => f.name !== filter);
            dispatch(setTypesForSearch(newFilters));
        }
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return;
        }

        setLoadingMore(true);
        getPokemons(offset);
    }

    

    const typesFiltered = stateTypesFiltered.types;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.container}>
                <Image style={styles.logoPokemon} source={logoPokemon} />
                <View style={styles.containerSearch}>
                    <Input
                        style={styles.inputSearch}
                        placeholder="Buscar Pokemon"
                        value={namePokemon}
                        onChangeText={name => setNamePokemon(name)}
                    />
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={filterIcon} />
                    </TouchableOpacity>


                </View>
                <View style={styles.containerFilter}>
                    <View style={{ height: 32 }}>
                        <ScrollView horizontal>
                            {typesFiltered.length > 0 &&
                                typesFiltered.map((type) => (
                                    <View key={type.name} style={styles.filter}>
                                        <Text style={styles.textFilter} >{type.name}</Text>
                                        <TouchableOpacity onPress={() => removeFilter(type.name)}>
                                            <Image source={removeIcon} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={styles.pokemons}>
                <FlatList
                    data={pokemons}
                    keyExtractor={pokemon => pokemon.id.toString()}
                    renderItem={({ item: pokemon }) => (
                        <Card data={pokemon}
                            onPress={() => (handleNavigationPokemonDetail(pokemon))}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.pokemonList}
                    numColumns={2}
                    horizontal={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                        <ActivityIndicator color={colors.darkBlue} />
                        : <></>
                    }
                />
            </View>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 17
    },
    logoPokemon: {
        width: 117,
        height: 41
    },
    containerSearch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 24
    },
    inputSearch: {
        backgroundColor: colors.grey,
        width: 288,
        height: 46,
        fontFamily: fonts.spartaRegular,
        borderRadius: 30,
        marginRight: 25,
    },
    containerFilter: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: "100%",
        height: 30,
        paddingLeft: 30,
        paddingTop: 20,
    },
    filter: {
        backgroundColor: colors.grey,
        width: 92,
        height: 32,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textFilter: {
        fontFamily: fonts.spartaRegular,
    },
    pokemons: {
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 30,
        justifyContent: 'center',

    },
    pokemonList: {}
});

export default Dashboard;