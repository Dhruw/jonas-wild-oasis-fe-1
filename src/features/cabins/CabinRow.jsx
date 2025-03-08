import { formatCurrency } from '@/utils/helpers';
import { useState } from 'react';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import useDuplicateCabin from './useDuplicateCabin';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';
import { HiTrash } from 'react-icons/hi2';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  const [showEditForm, setShowEditForm] = useState(false);

  const { isDeleting, deleteCabinMutation } = useDeleteCabin();
  const duplicateCabin = useDuplicateCabin();
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin> {name} </Cabin>
        <div>{maxCapacity}</div>
        <Price> {formatCurrency(regularPrice)} </Price>
        <Discount> {discount} </Discount>
        {/* <div>{description}</div> */}
        <div>
          {/* Delete */}
          <Modal>
            <Modal.Open opens="delete-modal">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-modal">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabinMutation(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              deleteCabinMutation(id);
            }}
          >
            Delete
          </button> */}
          {/* Edit */}
          <Modal>
            <Modal.Open opens="edit-modal">
              <button>Edit</button>
            </Modal.Open>
            <Modal.Window name="edit-modal">
              <CreateCabinForm editFormData={cabin} />
            </Modal.Window>
          </Modal>
          <button onClick={() => duplicateCabin(cabin)}>Duplicate</button>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;
