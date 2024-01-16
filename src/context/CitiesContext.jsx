/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import supabase from "../services/supabase";

const URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: {},
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        let { data } = await supabase.from("cities").select("*");

        dispatch({ type: "cities/loaded", payload: data });
        // console.log(data[0].idDatabase);
        // console.log("data", data);
        // console.log("data first", data[0]);
        // // console.log("data type", typeof data);
        // // console.log("data first type", typeof data[0]);
      } catch {
        dispatch({ type: "rejected", payload: "error in loading cities" });
        throw new Error("Cities could not be loaded");
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const { data } = await supabase
          .from("cities")
          .select("*")
          .eq("id", id)
          .single();

        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "rejected", payload: "error in loading city" });
        throw new Error("City not found");
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const { data } = await supabase.from("cities").insert(newCity).select();

      dispatch({ type: "cities/created", payload: data[0] });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: "error in creating city" });
      throw new Error("City not added");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await supabase.from("cities").delete().eq("id", id);
      dispatch({ type: "cities/deleted", payload: id });
      return data;
    } catch {
      dispatch({ type: "rejected", payload: "error in loading data" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside of cities provider");
  return context;
}

export { CitiesProvider, useCities };
