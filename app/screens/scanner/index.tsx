import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BackButton from '../../components/back-button';

const Scanner = () => {
  const onBarCodeRead = async e => {
    console.log('first', e.data);
  };

  return (
    <View style={styles.container}>
      <BackButton color={'white'} />
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={3000}
        onRead={onBarCodeRead}
        flashMode={RNCamera.Constants.Type.back}
        showMarker={true}
        customMarker={
          <BarcodeMask
            width={300}
            height={100}
            animatedLineColor={'red'}
            backgroundColor={'rgba(0,0,0,0)'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});

export default React.memo(Scanner);
