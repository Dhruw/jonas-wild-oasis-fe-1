import supabase from './supabse';

async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) console.error(error);
  return cabins;
}

export default getCabins;
