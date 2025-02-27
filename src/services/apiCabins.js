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

export async function createCabin(newCabin) {
  // 1. Create record for Cabin

  // Not just upload, specify the image name and location also
  // https://oxcqdigeklpoivmaqmjn.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert({ ...newCabin, image: imagePath })
    .select();
  if (error) console.error(error);

  // 2. Upload image after successfull record creation
  const { data: imageData, error: imageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, { cacheControl: '3600', upsert: false });

  // 3. Prevent new cabin from being created if image upload fails

  if (imageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    throw new Error('Cabin image could not be uploaded');
  }

  return data;
}

export async function updateCabin(newCabin, id = null) {
  console.log(id);
  const hasImagePath = typeof newCabin?.image === 'string';

  // 1. Create record for Cabin

  // Not just upload, specify the image name and location also
  // https://oxcqdigeklpoivmaqmjn.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image[0].name}`.replace('/', '');
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...newCabin, image: imagePath })
    .eq('id', id)
    .select();
  if (error) console.error(error);

  if (!hasImagePath) {
    // 2. Upload image after successfull record creation
    const { data: imageData, error: imageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image[0], {
        cacheControl: '3600',
        upsert: false,
      });

    // 3. Prevent new cabin from being created if image upload fails

    if (imageError) {
      await supabase.from('cabins').delete().eq('id', data.id);

      throw new Error('Cabin image could not be uploaded');
    }
  }

  return data;
}

export default getCabins;
