import {View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Platform} from '../../utils/platform';
import {useStore} from 'effector-react';
import {globalState} from '../../../effector';
const BMIchart = () => {
  const {statusLogs} = useStore(globalState.$store);
  return (
    <View>
      <LineChart
        data={{
          labels: statusLogs.map(log => log.createdAt),
          datasets: [
            {
              data: statusLogs.map(log => log.userBMI),
            },
          ],
        }}
        width={Platform.deviceWidth - (Platform.deviceWidth * 5) / 100} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#63d6ff',
          backgroundGradientFrom: '#63d6ff',
          backgroundGradientTo: '#22729b',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default BMIchart;
