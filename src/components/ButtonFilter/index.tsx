
import { Button } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {  removeType, setTypesForSearch, type } from "../../store/slices/typesSlice";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/font";

interface ButtonFilterProps {
    type: string;
    clear: boolean;
    updateState: React.Dispatch<React.SetStateAction<boolean>>
    handleSelectedType: React.Dispatch<React.SetStateAction<type[]>>
}

export function ButtonFilter(props: ButtonFilterProps) {
    const [selected, setSelected] = useState<boolean>(false);
    const [typeSelected, setTypeSelected] = useState<type[]>([]);
    const stateTypesFiltered = useSelector((state: RootState) => state.typesOfPokemos);
    const dispatch = useDispatch();


    useEffect(() => {
        setSelected(false);
        props.updateState(false);
    }, [props.clear])

    function handleButtonType(typeName: string) {        

        if (typeName === 'All') {
            const type = {
                name: 'all'
            } as type;
            setTypeSelected([type]);
            setSelected(!selected)
            return;
        }

        if (typeName !== 'All' && !selected) {
            console.log(`tipo de pokemon ${typeName} selecionado? ${!selected ? true : false}`);
            setSelected(!selected);
            const type = {
                name: typeName.toLowerCase()
            } as type;

            props.handleSelectedType(oldState => [...oldState, type]);
        }
        else {
            setSelected(!selected);
            props.handleSelectedType(oldState => oldState.filter(o => o.name !== typeName.toLowerCase()));
            dispatch(removeType(typeName.toLowerCase()))
        }
    }

    return (
        <View>
            <Button style={[
                styles.button,
                selected && styles.buttonSelected
            ]}
                onPress={() => handleButtonType(props.type)}
            >
                <Text style={[
                    styles.textButton,
                    selected && styles.textButtonSelected
                ]}>
                    {props.type}
                </Text>

            </Button>
        </View>
    )
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.buttonFilter,
        width: 127,
        height: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: colors.darkBlue,
    },
    textButton: {
        color: colors.textButtonFilter,
        fontFamily: fonts.spartaMedium,
        fontSize: 14
    },
    textButtonSelected: {
        color: colors.white,
    }
})