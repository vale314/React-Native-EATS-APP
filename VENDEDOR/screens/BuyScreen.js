import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import BuyList from "../components/BuyList";
import DefaultText from "../components/DefaultText";

import * as buyActions from "../store/actions/buy";
import Colors from "../constants/Colors";

const BuysScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const buysItems = useSelector((state) => state.buys.buys);
  const email = useSelector((state) => state.auth.userId);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(buyActions.fetchBuys(email));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    dispatch(buyActions.fetchBuys(email));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  const handleChange = () => {
    loadProducts();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (buysItems.length === 0 || !buysItems) {
    return (
      <View style={styles.content}>
        <DefaultText>No hay Compras</DefaultText>
      </View>
    );
  }
  return (
    <BuyList
      listData={buysItems}
      handleChange={handleChange}
      navigation={props.navigation}
      order={false}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Compras",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BuysScreen;
