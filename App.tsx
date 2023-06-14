import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ethers } from 'ethers';
// import { detect } from '@metamask/detect-provider';
import detectEthereumProvider from '@metamask/detect-provider';
import Onboarding from '@metamask/onboarding';

export default function App() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const initMetaMask = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const ethersProvider = new ethers.BrowserProvider(provider as any);
        const signer = ethersProvider.getSigner();
        const address = await (await signer).getAddress();
        setWalletAddress(address);
      }
    };

    initMetaMask();
  }, []);

  const connectMetaMask = async () => {
    const onboarding = new Onboarding({ forwarderOrigin: 'https://metamask.app.link' });
    await onboarding.startOnboarding();
  };

  return (
    <View style={styles.container}>
      <Button title="Connect MetaMask" onPress={connectMetaMask} />
      {walletAddress !== '' && <Text>Connected Wallet Address: {walletAddress}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
