import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { Text } from '@/components/Themed';
import { useSession } from '../contexts';

export default function AppLayout() {
    const { session, isLoading } = useSession();
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
        </Stack>
    )
}
