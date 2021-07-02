import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealList = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageurl}
        precio={itemData.item.price}
        ingredients={itemData.item.ingredients}
        key={itemData.item.idbuy}
        id={itemData.item.idbuy}
        cliente={itemData.item.firstname}
        fecha={itemData.item.fecha}
        handleChange={props.handleChange}
        order={props.order}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            key: itemData.item.idbuy,
            id: itemData.item.idbuy,
            mealTitle: itemData.item.title,
            mealTitle: itemData.item.title,
            title: itemData.item.title,
            image: itemData.item.imageurl,
            precio: itemData.item.price,
            ingredients: itemData.item.ingredients,
            cliente: itemData.item.firstname,
            description_product: itemData.item.description_product,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.idbuy}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealList;
