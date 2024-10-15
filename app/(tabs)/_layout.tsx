import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="two"
                options={{
                    title: "Adicionar evento",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="calendar-plus-o" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="hand-rock-o" color={color} />
                    ),
                }}
            />
            <Tabs.Screen name="two" />
        </Tabs>
    );
}
