import useCreateCabin from './useCreateCabin';

function useDuplicateCabin() {
  const createCabinMutation = useCreateCabin();
  const duplicateCabin = (newCabin) => {
    delete newCabin.id;
    newCabin.name = `Copy of ${newCabin.name}`;
    console.log(newCabin)

    createCabinMutation(newCabin);
  };
  return duplicateCabin;
}

export default useDuplicateCabin;
