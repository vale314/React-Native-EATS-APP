import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const {
    title,
    image,
    precio,
    key,
    cliente,
    ingredients,
    description_product,
  } = props.route.params;

  if (key === undefined || key === null) {
    return <Text>NO HAY ARTICULO</Text>;
  }
  return (
    <ScrollView>
      <Image
        source={{ uri: `data:image/gif;base64,${image}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <DefaultText>$ {precio}</DefaultText>
        <DefaultText>{cliente}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredientes</Text>
      {ingredients.split(",").map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Descripcion</Text>
      <ListItem>{description_product}</ListItem>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const mealTitle = navData.route.params.mealTitle;

  return {
    headerTitle: mealTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  descripcion: {
    textAlign: "justify",
  },
});

export default MealDetailScreen;
