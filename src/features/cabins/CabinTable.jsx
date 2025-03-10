import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (error) return <div> Error </div>;

  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  switch (filterValue) {
    case 'no-discount':
      filteredCabins = cabins?.filter((cabin) => cabin?.discount === 0);
      break;
    case 'with-discount':
      filteredCabins = cabins?.filter((cabin) => cabin?.discount !== 0);
      break;
    default:
      filteredCabins = cabins;
  }

  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        render={filteredCabins?.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      />
    </Table>
  );
}

export default CabinTable;
