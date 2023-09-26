import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  {useState} from "react";
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import {Audio} from "expo-av";

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTab, setCurrentTab] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false)

  const handleTimer = () => {
    playSound();
    setIsActive(!isActive);
  }

  const playSound = async () => {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )

    await sound.playAsync();
  }

  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(()=>{
        setTime(time - 1)
      },1000)
    } else {
      clearInterval(interval);
    }

    if(time === 0 ) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking  ? 300 : 1500);
    }

    return () =>  clearInterval(interval);
  }, [isActive, time])
  

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTab]}]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === "android" && 50}}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header time={time} currentTab={currentTab} setCurrentTab={setCurrentTab} setTime={setTime}/>
        <Timer  time={time}/>
        <TouchableOpacity style={styles.btn} onPress={() => handleTimer()}>
          <Text style={{color: "#fff", fontWeight: "bold"}}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32, 
    fontWeight: 'bold'
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    marginTop:15,
    borderRadius: 15,
  }
});
