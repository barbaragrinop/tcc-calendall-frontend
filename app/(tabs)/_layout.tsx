import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Tabs, usePathname, useRouter } from "expo-router";
import { IconClassroom } from "@/assets/images/classroom";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    // const currentRouter = usePathname();
    
    return (
        <Tabs
            screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
        >
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
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="classroom/index"
                options={{
                    title: "Salas",
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <IconClassroom
                                style={{ width: size, height: size }}
                                color={color}
                            />
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="classroom/details/[idClassroom]"
                options={{
                    href: null
                }}
            />

        </Tabs>
    );
}
