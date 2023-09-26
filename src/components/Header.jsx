import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({time, currentTab, setCurrentTab, setTime}) => {

    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTab(index);
        setTime(newTime * 60);
    }

  return (
    <View style={{flexDirection: "row"}}>
        {options.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.itemStyle, currentTab !== index && {borderColor: "transparent"}]} onPress={() => handlePress(index)}> 
                <Text style={{fontWeight: "bold"}}>{item}</Text>
            </TouchableOpacity>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        alignItems: "center",
        borderWidth: 3,
        padding: 5,
        borderRadius:10,
        borderColor: "white",
        marginVertical:20

    }
})

export default Header;