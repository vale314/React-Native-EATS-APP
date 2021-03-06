export const SET_BUYS = "SET_BUYS";

const path = "https://cucei-eats.herokuapp.com";
// const path = "http://localhost:5000";

export const fetchBuys = (email) => {
  return async (dispatch) => {
    // any async code you want!
    dispatch({
      type: SET_BUYS,
      buys: [],
    });
    const response = await fetch(`${path}/api/seller/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const resData = await response.json();
    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }

    var loadedBuys = resData.buys;

    dispatch({
      type: SET_BUYS,
      buys: loadedBuys,
    });
  };
};
