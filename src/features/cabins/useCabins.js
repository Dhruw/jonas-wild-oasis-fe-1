import { useQuery } from '@tanstack/react-query';
import { getCabins } from '@/services/apiCabins';

function useCabin() {
  const {
    data: cabins,
    error,
    isPending,
  } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });
  return { cabins, isPending, error };
}

export default useCabin;
