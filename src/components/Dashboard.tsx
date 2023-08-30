import { Box, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../types/userTypes';
import { BiTargetLock } from 'react-icons/bi';
import { CustomLineChart } from './CustomLineChart';
import { OPDELEGATES_PURPLE, OPDELEGATES_RED } from '../themes';
import { CustomAreaChart } from './CustomAreaChart';
import { CustomTable } from './CustomTable';
import { CustomBarsChart } from './CustomBarsChart';

const CHART_HEIGHT = '330';
function Dashboard() {
  const { user, setUser }: UserContextType = useContext(UserContext);

  const [opDelegatedData, setPpDelegatedData] = useState([
    { month: 'Feb', date: '08/03/2023', quantity: 10 },
    { month: 'Feb', date: '08/03/2023', quantity: 20 },
    { month: 'Feb', date: '08/03/2023', quantity: 30 },
    { month: 'Feb', date: '08/03/2023', quantity: 35 },
    { month: 'Feb', date: '08/03/2023', quantity: 35 },
    { month: 'Feb', date: '08/03/2023', quantity: 40 },
    { month: 'Feb', date: '08/03/2023', quantity: 70 },
  ]);

  const tableHeaders = ['#', 'Delegator', 'OP delegated'];
  const tableData = [
    { n: 1, address: '0x11...d752', delegated: 120000 },
    { n: 2, address: 'asdasda', delegated: 12000 },
    { n: 3, address: '0x11...d752', delegated: 1200 },
    { n: 4, address: 'asdasda', delegated: 120 },
    { n: 5, address: '0x11...d752', delegated: 20 },
    { n: 6, address: 'asdasda', delegated: 10 },
  ];

  const [barsData, setBarsData] = useState([
    { label: '0-5', quantity: 10 },
    { label: '5-50', quantity: 20 },
    { label: '50-500', quantity: 30 },
    { label: '500-5k', quantity: 35 },
    { label: '+5k', quantity: 35 },
    { label: '+10k', quantity: 40 },
  ]);

  return (
    <Box px={[4, 4, 12, 20]}>
      <HStack justifyContent="space-between" py={6}>
        <HStack fontSize={[24, 24, 30]}>
          <BiTargetLock color="red" />
          <Text as="b">
            {user?.userName ? `@${user?.userName}` : user?.address}
          </Text>
        </HStack>
        <Box
          background="linear-gradient(91.5deg, rgba(255, 4, 32, 0.5) 0%, rgba(146, 5, 253, 0.5) 100%)"
          padding="1px"
          borderRadius="5px"
        >
          <HStack
            bg="white"
            borderRadius="5px"
            p={4}
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
          >
            <Text fontSize={[16, 16, 20]}>
              <b>86,000 OP</b> delegated from <b>462</b> delegators
            </Text>
          </HStack>
        </Box>
      </HStack>
      <Divider />

      <Stack py={6} gap={4} display="flex">
        {/* Line Charts */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={4}
        >
          <Box w={['100%', '100%', '50%']}>
            <Heading mb={4} fontSize={24}>
              OP Delegated
            </Heading>
            <Box h={CHART_HEIGHT}>
              <CustomLineChart
                data={opDelegatedData}
                themeColor={OPDELEGATES_RED}
              />
            </Box>
          </Box>
          <Box w={['100%', '100%', '50%']}>
            <Heading mb={4} fontSize={24}>
              Delegators
            </Heading>
            <Box h={CHART_HEIGHT}>
              <CustomLineChart
                data={opDelegatedData}
                themeColor={OPDELEGATES_PURPLE}
              />
            </Box>
          </Box>
        </Stack>

        {/* Area Charts */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={4}
        >
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomAreaChart
              data={opDelegatedData}
              label="OP Delegated"
              themeColor={OPDELEGATES_RED}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomAreaChart
              label="Delegators"
              data={opDelegatedData}
              themeColor={OPDELEGATES_PURPLE}
            />
          </Box>
        </Stack>

        {/* Top delegators */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={4}
        >
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomTable
              label="Top delegators"
              headers={tableHeaders}
              data={tableData}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomBarsChart data={barsData} label="Delegator sizes" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Dashboard;
