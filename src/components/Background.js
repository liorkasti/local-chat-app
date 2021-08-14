import React from 'react'
import { ImageBackground, StyleSheet, View, StatusBar, SafeAreaView, ScrollView, Dimensions, } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <StatusBar backgroundColor='#009387' barStyle="light-content" />

      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView>
            {children}
          </SafeAreaView>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    // paddingTop: height,
  },
  container: {
    flex: 1,
    // padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
