/* eslint-disable @typescript-eslint/no-var-requires */
import React, { FC, useState } from 'react';
import { HighAndLow } from './components/HighAndLowGame/HighAndLowGame';
import { Box, render } from 'ink';
const Gradient: FC<{ name: string }> = require('ink-gradient');
const BigText: FC<{ text: string }> = require('ink-big-text');
import SelectInput from 'ink-select-input';

const TitleScreen: FC<{ setScreen: (screen: string) => void }> = ({ setScreen }) => {
  const items = [
    {
      label: 'High and Low Game',
      value: 'high-and-low',
    },
    {
      label: '神経衰弱(TODO)',
      value: 'concentration',
    },
  ];
  return (
    <Box alignItems="center" flexDirection="column">
      <Box>
        <Gradient name="rainbow">
          <BigText text="casino" />
        </Gradient>
      </Box>
      <Box>
        <SelectInput items={items} onSelect={(item) => setScreen(item.value)} />
      </Box>
    </Box>
  );
};

const Casino: FC = () => {
  const [screen, setScreen] = useState('title');
  return (
    <>
      {screen === 'title' ? <TitleScreen setScreen={setScreen} /> : null}
      {screen === 'high-and-low' ? <HighAndLow /> : null}
    </>
  );
};

console.clear();
render(<Casino />);
