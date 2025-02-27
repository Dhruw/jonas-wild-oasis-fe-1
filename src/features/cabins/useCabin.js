import { useQuery } from '@tanstack/react-query';
import getCabins from '@/services/apiCabins';

function useCabin() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });
  return { cabins, isLoading, error };
}

export default useCabin;
