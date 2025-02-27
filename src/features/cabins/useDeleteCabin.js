import { deleteCabin } from '@/services/apiCabins';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinMutation, data } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // queryClient.invalidateQueries({ exact: 'cabin' });
      queryClient.invalidateQueries({ queryKeys: ['cabin'] });
      toast.success('Deleted successfully');
    },
    onError: (error) => {
      toast.error('Something went wrong');
    },
  });

  return deleteCabinMutation;
}

export default useDeleteCabin;
