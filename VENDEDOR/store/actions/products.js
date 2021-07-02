export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

const path = "https://cucei-eats.herokuapp.com";
// const path = "http://localhost:5000";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;

    const response = await fetch(`${path}/api/seller/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userId,
      }),
    });

    const resData = await response.json();

    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }

    var loadedProducts = [];

    loadedProducts = resData.products;

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const response = await fetch(`${path}/api/seller/delete-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userId,
        productId: productId,
      }),
    });

    const resData = await response.json();

    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title,
  description,
  imageUrl,
  ingredients,
  price,
  isAvailable,
  isVegetarian,
  isGlutenFree,
  isLactoseFree,
  isVegan,
  isDesayuno,
  isComida,
  isSnack,
  isLonche,
  isSandiwch,
  isTaco,
  isPan,
  isDulce
) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`${path}/api/seller/new-product`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title,
        description,
        imageUrl,
        ingredients,
        price,
        ownerId: userId,
        available: isAvailable,
        vegetarian: isVegetarian,
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        desayuno: isDesayuno,
        comida: isComida,
        snack: isSnack,
        lonche: isLonche,
        sandiwch: isSandiwch,
        taco: isTaco,
        pan: isPan,
        dulce: isDulce,
      }),
    });
    var resData;

    resData = await response.json();

    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }
    const {
      ProductId,
      ProductTitle,
      ProductDescription,
      ProductImageUrl,
      ProductIngredients,
      ProductPrice,
      ProductOwnerId,
      ProductAvailable,
      ProductVegetarian,
      ProductGlutenFree,
      ProductLactosaFree,
      ProductVegan,
      ProductDesayuno,
      ProductComida,
      ProductSnack,
      ProductLoche,
      ProductSandiwch,
      ProductTaco,
      ProductPan,
      ProductDulce,
    } = resData.product;

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: ProductId,
        title: ProductTitle,
        description: ProductDescription,
        available: ProductAvailable,
        imageurl: ProductImageUrl,
        ingredients: ProductIngredients,
        price: ProductPrice,
        ownerId: ProductOwnerId,
        vegetarian: ProductVegetarian,
        glutenFree: ProductGlutenFree,
        lactosaFree: ProductLactosaFree,
        vegan: ProductVegan,
        desayuno: ProductDesayuno,
        comida: ProductComida,
        snack: ProductSnack,
        lonche: ProductLoche,
        sandiwch: ProductSandiwch,
        taco: ProductTaco,
        pan: ProductPan,
        dulce: ProductDulce,
      },
    });
  };
};

export const updateProduct = (
  title,
  description,
  imageUrl,
  ingredients,
  price,
  productId,
  available,
  isVegetarian,
  isGlutenFree,
  isLactoseFree,
  isVegan,
  isDesayuno,
  isComida,
  isSnack,
  isLonche,
  isSandiwch,
  isTaco,
  isPan,
  isDulce
) => {
  return async (dispatch, getState) => {
    dispatch(deleteProduct(productId)).then(
      dispatch(
        createProduct(
          title,
          description,
          imageUrl,
          ingredients,
          price,
          available,
          isVegetarian,
          isGlutenFree,
          isLactoseFree,
          isVegan,
          isDesayuno,
          isComida,
          isSnack,
          isLonche,
          isSandiwch,
          isTaco,
          isPan,
          isDulce
        )
      )
    );
  };
};
