import { View, Text, StyleSheet, SectionList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { LineChart } from "react-native-gifted-charts";

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const chartData=[ {value:50}, {value:80}, {value:90}, {value:70}, {value:50}, {value:80}, {value:90}, {value:70}, {value:90}, {value:70}, {value:50} ]

export default function Details() {

  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async()=>{
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json())
      return info[+id];
    }
  })

  // const { data: tickers } = useQuery({
  //   queryKey: ['tickers'],
  //   queryFn: async (): Promise<any[]> => fetch(`/api/tickers`).then((res) => res.json()),
  // });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        // scrollEnabled={true}
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: 'Chart' }] }]}

        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
                <Text
                  style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        
        ListHeaderComponent={()=>(
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <Text style={styles.subtitle}>{data?.symbol}</Text>
              <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
            </View>
        )}

        renderItem={()=>(
          <>
          <View style={[defaultStyles.block]}>
          <LineChart 
          data = {chartData} 
          color={Colors.primary}
          startFillColor={Colors.primary}
          thickness={7}
          width={280}
          height={280}
          areaChart
           />
          </View>

          <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                {data?.description}
              </Text>
            </View>
          </>
        )}
      >
      
      </SectionList>

            
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});