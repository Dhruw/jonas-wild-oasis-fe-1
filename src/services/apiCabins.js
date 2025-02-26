import supabase from './supabse';

async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) console.error(error);
  return cabins;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);
  if (error) console.error(error);
  return data;
}

export default getCabins;
