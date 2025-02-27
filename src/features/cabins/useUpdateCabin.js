import { updateCabin } from '@/services/apiCabins';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabinMutation } = useMutation({
    mutationFn: ({ id, newCabin }) => updateCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: 'cabin' });
      toast.success('Cabin Successfully Edited');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return updateCabinMutation;
}

export default useUpdateCabin;
