import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { useCallback, useEffect } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];


export function useSecureStoreManagement() {

    /**
     * A função useAsyncState irá retornar um estado e uma função para alterar esse estado, 
     * mas com um estado inicial de loading, que será true, e o valor inicial, 
     * que será null
    **/
    function useAsyncState<T>(
        initialValue: [boolean, T | null] = [true, null]
    ): UseStateHook<T> {
        return React.useReducer(
            (
                state: [boolean, T | null],
                action: T | null = null
            ): [boolean, T | null] => [false, action],
            initialValue
        ) as UseStateHook<T>;
    }

    /**
     * Irá salvar ou deletar um item no storage do dispositivo, dependendo do valor passado.
    */
    async function setStorageItemAsync(key: string, value: string | null) {
        if (value === null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }

    /**
     * @summary Irá retornar um estado e uma função para alterar esse estado, 
     * salvando e recuperando as informações do storage do dispositivo
     * utilizando a biblioteca expo-secure-store.
     * @description
     * Logo, se eu usar o hook dessa forma: useStorageState('session'), ele irá retornar: isLoading, session e setSession.
     * 
     * Mas se eu usasse dessa forma: useStorageState('user'), ele irá retornar: isLoading, user e setUser, por exemplo. 
     * Podemos então entender que o useStorageState é um hook genérico que irá retornar um estado e uma função para alterar 
     * esse estado, salvando e recuperando as informações do storage do dispositivo utilizando a biblioteca expo-secure-store.
     * 
     * @returns
     * isLoading, session e setSession.
    */
    function useStorageState<T>(key: string): UseStateHook<T> {
        const [state, setState] = useAsyncState<T>();

        useEffect(() => {
            SecureStore.getItemAsync(key).then((value) => {
                if (value) {
                    console.log('value de dentro', value)
                    try {
                        setState(JSON.parse(value) as T); // Desserializa o objeto
                    } catch {
                        console.log('catch')
                        setState(null); // Trata caso o valor salvo não seja um JSON válido
                    }
                } else {
                    setState(null);
                }
            });
        }, [key]);

        const setValue = useCallback(
            (value: T | null) => {
                setState(value);
                const serializedValue = value ? JSON.stringify(value) : null; // Serializa o objeto
                setStorageItemAsync(key, serializedValue);

            },
            [key]
        );

        return [state, setValue];
    }

    return {
        useStorageState,
        useAsyncState,
        setStorageItemAsync
    }


}


