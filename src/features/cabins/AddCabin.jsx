import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import Row from '@/ui/Row';
import React from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useState } from 'react';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button> Create New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      {/* //// */}
      {/* <Modal.Open opens="table-modal">
        <Button> Open Table</Button>
      </Modal.Open>
      <Modal.Window name="table-modal">
        <div>ABCD</div>
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
