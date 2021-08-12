import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function UsersList({ navigation }) {
  const usersOnline = useSelector(state => state.usersOnline);
  const { itemContainerStyle, avatarImgStyle, avatarNameViewStyle } = styles;

  console.log("usersOnline: ", usersOnline)

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={usersOnline}
        keyExtractor={item => item.userId}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("item.userId: ", item);
                navigation.navigate("ChatRoom", {
                  name: item.username,
                  userId: item.userId
                })
              }
              }
            >
              <View style={itemContainerStyle}>
                <Image style={avatarImgStyle} source={{ uri: item.avatar }} />
                <View style={avatarNameViewStyle}>
                  <Text style={{ fontSize: 20 }}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: { flex: 1, flexDirection: "row" },
  avatarImgStyle: { width: 100, height: 100, borderRadius: 50 },
  avatarNameViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
