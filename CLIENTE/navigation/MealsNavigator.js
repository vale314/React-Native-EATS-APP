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

import CategoriesScreen, {
  screenOptions as CategoriesScreenOptions,
} from "../screens/CategoriesScreen";
import CategoryMealsScreen, {
  screenOptions as CategoryMealsScreenOptions,
} from "../screens/CategoryMealsScreen";
import MealDetailScreen, {
  screenOptions as MealDetailScreenOptions,
} from "../screens/MealDetailScreen";
import FavoritesScreen, {
  screenOptions as FavoritesScreenOptions,
} from "../screens/FavoritesScreen";
import FiltersScreen, {
  screenOptions as FiltersScreenOptions,
} from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/AuthScreen";

import { logout } from "../store/actions/auth";
import BuysScreen, {
  screenOptions as BuyScreenOptions,
} from "../screens/BuysScreen";

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
        name="Categories"
        component={CategoriesScreen}
        options={CategoriesScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="Categoria Comida"
        component={CategoryMealsScreen}
        options={CategoryMealsScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </MealsStackNavigator.Navigator>
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

const FavStackNavigator = createStackNavigator();

export const FavNavigator = () => {
  return (
    <FavStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FavStackNavigator.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={FavoritesScreenOptions}
      />
      <FavStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </FavStackNavigator.Navigator>
  );
};

const BuyStackNavigator = createBottomTabNavigator();

export const BuyNavigator = () => {
  return (
    <BuyStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <BuyStackNavigator.Screen
        name="Buys"
        component={BuysNavigator}
        options={BuyScreenOptions}
      />
    </BuyStackNavigator.Navigator>
  );
};

const MealsBottonNavigator = createBottomTabNavigator();

const MealsFavTabNavigator = () => {
  return (
    <MealsBottonNavigator.Navigator>
      <MealsBottonNavigator.Screen
        name="Comdias"
        component={MealsNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="md-restaurant"
              size={25}
              color={Colors.accentColor}
            />
          ),
        }}
      />
    </MealsBottonNavigator.Navigator>
  );
};

const FilterStackNavigator = createStackNavigator();

export const FiltersNavigator = () => {
  return (
    <FilterStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FilterStackNavigator.Screen
        name="Filter"
        component={FiltersScreen}
        options={FiltersScreenOptions}
      />
      <FilterStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreenOptions}
      />
    </FilterStackNavigator.Navigator>
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
                title="Logout"
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
          title: "Categorias",
          drawerIcon: (props) => (
            <Item
              title="Menu"
              iconName="md-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <MainDrawerNavigator.Screen
        name="Filtro"
        component={FiltersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name={"md-barcode"} size={23} color={props.color} />
          ),
        }}
      />
      <MainDrawerNavigator.Screen
        name="Fav"
        component={FavNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name={"md-star-outline"} size={23} color={props.color} />
          ),
        }}
      />

      <MainDrawerNavigator.Screen
        name="Compras"
        component={BuyNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name={"md-cart"} size={23} color={props.color} />
          ),
        }}
      />
    </MainDrawerNavigator.Navigator>
  );
};
