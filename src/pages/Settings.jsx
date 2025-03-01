import useSettings from '@/features/settings/useSettings';
import Heading from '@/ui/Heading';

function Settings() {
  const { data, error, isLoading } = useSettings();

  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
    </>
  );
}

export default Settings;
