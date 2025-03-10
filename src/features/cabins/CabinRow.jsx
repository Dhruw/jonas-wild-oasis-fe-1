import ConfirmDelete from '@/ui/ConfirmDelete';
import Modal from '@/ui/Modal';
import Table from '@/ui/Table';
import { formatCurrency } from '@/utils/helpers';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import useDuplicateCabin from './useDuplicateCabin';
import Menus from '@/ui/Menus';
import { HiDuplicate } from 'react-icons/hi';

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

  const { isDeleting, deleteCabinMutation } = useDeleteCabin();
  const duplicateCabin = useDuplicateCabin();
  return (
    <>
      <Table.Row>
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

          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => duplicateCabin(cabin)}
                >
                  Duplicate
                </Menus.Button>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
