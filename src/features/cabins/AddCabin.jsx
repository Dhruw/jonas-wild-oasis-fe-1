import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import Row from '@/ui/Row';
import React from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useState } from 'react';

function AddCabin() {
  const [showCreateCabinModal, setShowCreateCabinModal] = useState(false);

  return (
    <div>
      <Row>
        <Button onClick={() => setShowCreateCabinModal((show) => !show)}>
          Create New Cabin
        </Button>
      </Row>
      <Row>
        {showCreateCabinModal && (
          <Modal onClose={() => setShowCreateCabinModal(false)}>
            <CreateCabinForm onClose={() => setShowCreateCabinModal(false)} />
          </Modal>
        )}
      </Row>
    </div>
  );
}

export default AddCabin;
