import supabase from "./supabase";

export async function getCities() {
  let { data: cities, error } = await supabase.from("cities").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cities;
}
