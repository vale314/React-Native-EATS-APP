import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";

import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const path = "https://cucei-eats.herokuapp.com";
// const path = "http://localhost:5000";

const MealItem = (props) => {
  const handleAccept = async () => {
    const response = await fetch(`${path}/api/seller/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idBuy: props.id,
      }),
    });

    const resData = await response.json();
    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }
    props.handleChange();
  };

  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: `data:image/gif;base64,${props.image}` }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                  {props.order}
                </Text>
                {props.order == true ? (
                  <Text> - </Text>
                ) : (
                  <Button
                    color={Colors.primary}
                    title="Aceptar Compra"
                    style={styles.Button}
                    onPress={handleAccept}
                  />
                )}
              </View>
            </ImageBackground>
          </View>

          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>$ {props.precio} </DefaultText>
            <DefaultText>{props.fecha}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    marginStart: 0,
    paddingVertical: 0,
  },
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "16%",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default MealItem;
