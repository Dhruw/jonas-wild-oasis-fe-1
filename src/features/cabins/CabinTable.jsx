import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';

function CabinTable() {
  const { cabins, isPending, error } = useCabins();

  if (isPending) return <Spinner />;

  if (error) return <div> Error </div>;

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
        render={cabins?.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      />
    </Table>
  );
}

export default CabinTable;
