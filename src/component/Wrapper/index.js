import React from 'react'
import { StyleSheet, Text, View,ImageBackground, ScrollView } from 'react-native'

const index = () => {
    return (
        <View>
            <ImageBackground style={styles.conatiner} />
        </View>
        
    )
}

export default index

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:"#430064"
        
    }
})
