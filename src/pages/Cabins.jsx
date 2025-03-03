import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';
import { useState } from 'react';

function Cabins() {
  const [showCreateCabinModal, setShowCreateCabinModal] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Button onClick={() => setShowCreateCabinModal((show) => !show)}>
          Create New Cabin
        </Button>
      </Row>
      <Row>{showCreateCabinModal && <CreateCabinForm />}</Row>
    </>
  );
}

export default Cabins;
