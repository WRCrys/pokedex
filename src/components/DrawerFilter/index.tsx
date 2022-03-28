import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/font";
import closeIcon from '../../assets/close.png';
import { ButtonFilter } from "../ButtonFilter";
import { Button } from "@ant-design/react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatName, generateGuid } from "../../Utils";
import { removeAllFilters, setTypesForSearch, type } from "../../store/slices/typesSlice";

interface filter {
    id: string;
    type: string;
}

export function DrawerFilter(props: DrawerContentComponentProps) {

    const [filters, setFilters] = useState<filter[]>([]);

    const [typeSelected, setTypeSelected] = useState<type[]>([]);

    const screenState = useSelector((state: RootState) => state.pokemons);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const pokemons = screenState.pokemons;

        var typesFromRedux = [] as string[];

        typesFromRedux.push('All');

        pokemons.map((pokemon) => {
            typesFromRedux.push(
                pokemon.types[0].type.name);
        })

        const distinctTypes = [...new Set(typesFromRedux)];

        var arr = [] as filter[];

        distinctTypes.map((type) => {
            arr.push({
                id: generateGuid(),
                type: formatName(type)
            } as filter);
        })
        setFilters(arr);
    }, [screenState.pokemons]);

    const [clearFilters, setClearFilters] = useState<boolean>(false);

    function applyFilters() {
        dispatch(setTypesForSearch(typeSelected));
        props.navigation.closeDrawer();
    }

    function handleClearFilters() {
        setClearFilters(true);
        const type = {
            name: 'all'
        } as type;
        dispatch(setTypesForSearch([type]));
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.textTitle}>Filtro</Text>
                    <Text
                        style={styles.textClearFilters}
                        onPress={handleClearFilters}
                    >
                        Limpar filtros</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                        <Image style={styles.closeIcon} source={closeIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.subtitle}>
                <Text style={styles.textSubtitle}>
                    Tipo
                </Text>
            </View>
            <View style={styles.filters}>
                <FlatList
                    data={filters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={(item) => (
                        <ButtonFilter 
                        type={item.item.type} 
                        clear={clearFilters} 
                        updateState={setClearFilters} 
                        handleSelectedType={setTypeSelected}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    horizontal={false}
                />
            </View>
            <View style={styles.contentBottom}>
                <Button
                    style={styles.buttonBottom}
                    onPress={applyFilters}
                >
                    <Text style={styles.textButtonBottom}>Aplicar</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 24,
        marginVertical: 19
    },
    header: {
        alignItems: 'flex-start',
        flexDirection: 'row',

    },
    headerText: {
        flexDirection: 'row',
        width: '90%',
    },
    textTitle: {
        marginRight: 10,
        fontFamily: fonts.spartaBold,
        fontSize: 24,
        color: colors.textPokemon
    },
    textClearFilters: {
        fontFamily: fonts.spartaMedium,
        fontSize: 12,
        color: '#4A7DFF',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    closeIcon: {
        marginTop: 7,
    },
    subtitle: {
        width: '100%',
        marginTop: 41
    },
    textSubtitle: {
        fontFamily: fonts.spartaSemiBold,
        fontSize: 16
    },
    filters: {
        flex: 1,
        // paddingHorizontal: 35,
        paddingVertical: 30,
        justifyContent: 'center',
    },
    contentBottom: {
        width: '100%',
        justifyContent: 'center',
    },
    buttonBottom: {
        width: 280,
        height: 44,
        borderRadius: 4,
        backgroundColor: colors.darkBlue
    },
    textButtonBottom: {
        fontFamily: fonts.spartaSemiBold,
        fontSize: 14,
        color: colors.white
    }
});