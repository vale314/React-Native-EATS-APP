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

import * as ordersActions from "../store/actions/orders";
import Colors from "../constants/Colors";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const buysItems = useSelector((state) => state.orders.orders);
  const email = useSelector((state) => state.auth.userId);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders(email));
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
    dispatch(ordersActions.fetchOrders(email));
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
        <DefaultText>No hay Pedidos</DefaultText>
      </View>
    );
  }
  return (
    <BuyList
      listData={buysItems}
      handleChange={handleChange}
      navigation={props.navigation}
      order={true}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Tus Ordenes",
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

export default OrderScreen;
