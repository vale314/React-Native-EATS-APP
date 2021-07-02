import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Item } from "react-navigation-header-buttons";

import { Platform, SafeAreaView, Button, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import MealDetailScreen, {
  screenOptions as MealDetailScreenOptions,
} from "../screens/MealDetailScreen";

import UserProductScreen, {
  screenOptions as UserProductScreenOptions,
} from "../screens/UserProductScreen";
import EditProductScreen, {
  screenOptions as EditProductScreenOptions,
} from "../screens/EditProduct";

import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/AuthScreen";

import BuysScreen, {
  screenOptions as BuyScreenOptions,
} from "../screens/BuyScreen";

import OrderScreen, {
  screenOptions as OrderSceenOptions,
} from "../screens/OrderScreen";

import { logout } from "../store/actions/auth";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Colors.primaryColor,

  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const MealsStackNavigator = createStackNavigator();

export const MealsNavigator = () => {
  return (
    <MealsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <MealsStackNavigator.Screen
        name="Product"
        component={UserProductScreen}
        options={UserProductScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductScreenOptions}
      />

      <MealsStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </MealsStackNavigator.Navigator>
  );
};

const OrdersNowStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrdersNowStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <OrdersNowStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={OrderSceenOptions}
      />
      <OrdersNowStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </OrdersNowStackNavigator.Navigator>
  );
};

const BuysStackNavigator = createStackNavigator();

export const BuysNavigator = () => {
  return (
    <BuysStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <BuysStackNavigator.Screen
        name="Buy"
        component={BuysScreen}
        options={BuyScreenOptions}
      />
      <BuysStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </BuysStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

const MealsBottonNavigator = createBottomTabNavigator();

const MealsFavTabNavigator = () => {
  return (
    <MealsBottonNavigator.Navigator>
      <MealsBottonNavigator.Screen
        name="Tu Comida"
        component={MealsNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={Colors.accentColor}
            />
          ),
        }}
      />
    </MealsBottonNavigator.Navigator>
  );
};

const BuyStackNavigator = createBottomTabNavigator();

export const BuyNavigator = () => {
  return (
    <BuyStackNavigator.Navigator>
      <BuyStackNavigator.Screen
        name="Compras"
        component={BuysNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={Colors.accentColor}
            />
          ),
        }}
      />
    </BuyStackNavigator.Navigator>
  );
};

const OrderStackNavigator = createBottomTabNavigator();

export const OrdersNowNavigator = () => {
  return (
    <OrderStackNavigator.Navigator>
      <OrderStackNavigator.Screen
        name="Tu-Orden"
        component={OrderNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={Colors.accentColor}
            />
          ),
        }}
      />
    </OrderStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch();

  return (
    <MainDrawerNavigator.Navigator
      headerMode="none"
      screenOptions={(defaultStackNavOptions, { headerShown: false })}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Salir"
                color={Colors.primary}
                onPress={() => {
                  dispatch(logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <MainDrawerNavigator.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{
          title: "Tu Comida",
          drawerIcon: (props) => (
            <Item
              title="Menu"
              iconName="md-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
              color={Colors.accentColor}
            />
          ),
          drawerLabel: "Tu Comida",
        }}
      />
      <MainDrawerNavigator.Screen
        name="Compras"
        component={BuyNavigator}
        options={{
          title: "Compras",
          drawerIcon: (props) => (
            <Item
              title="Menu"
              iconName="md-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          ),
          drawerLabel: "Compras",
        }}
      />
      <MainDrawerNavigator.Screen
        name="Ordenes"
        component={OrdersNowNavigator}
        options={{
          title: "Pedidos",
          drawerIcon: (props) => (
            <Item
              title="Menu"
              iconName="md-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          ),
          drawerLabel: "Pedidos",
        }}
      />
    </MainDrawerNavigator.Navigator>
  );
};
