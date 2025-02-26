import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import { useForm } from 'react-hook-form';
// import { Form } from 'react-router-dom';
import Form from '@/ui/Form';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '@/services/apiCabins';
import toast from 'react-hot-toast';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: 'cabin' });
      toast.success('New cabin created');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  function onSubmitFunction(data) {
    mutate(data);
  }

  function onErrorFunction(error) {
    console.log(error);
    toast.error('Something went wrong');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitFunction, onErrorFunction)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.type && <Error> Put something here </Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'minimum 1 required' },
          })}
        />
        {errors?.maxCapacity?.type && <Error> Put something here </Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount must be less than Regular Price',
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
