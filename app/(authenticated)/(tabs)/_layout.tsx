import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import CustomHeader from '@/components/CustomHeader'
import { useUser } from '@clerk/clerk-expo'

const Layout = () => {

  const { user } = useUser();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors.primary,
    }}
    >

        <Tabs.Screen
            name="home"
            options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
                <FontAwesome name="registered" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            // headerTransparent: true,
            }}
        />
        {/* <Tabs.Screen
            name="invest"
            options={{
            title: 'Invest',
            tabBarIcon: ({ size, color }) => (
                <FontAwesome name="line-chart" size={size} color={color} />
            ),
            }}
        /> */}
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transfers',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: 'Crypto',
          tabBarIcon: ({ size, color }) => <FontAwesome name="bitcoin" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ size, color }) => 
          // <FontAwesome name="th" size={size} color={color} />
          <Image source={{ uri: user?.imageUrl }} 
          style={{
            width: 25,
            height: 25,
            borderRadius: 50,
            backgroundColor: Colors.gray,
          }} 
          ></Image>
        }}
      />

    </Tabs>
  )
}

export default Layout