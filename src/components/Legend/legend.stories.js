import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Legend from './legend';
import Collapsible from '../Collapsible/collapsible';
import Toggle from '../Toggle/toggle';
import Text from '../Typography/text';
import Subheader from '../Typography/subheader';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#444',
  ui02: '#333',
  type01: 'white',
};

storiesOf('Legend', module)
  .add('Default', () => (
    <div>
      <Legend>
        <Legend.Panel>
          <Collapsible>
            <Collapsible.Header>
              <Subheader>Global Index</Subheader>
            </Collapsible.Header>
            <Collapsible.Content>
              <Toggle htmlFor="active">
                <Text>Active</Text>
              </Toggle>
            </Collapsible.Content>
          </Collapsible>
        </Legend.Panel>
        <Legend.Panel>
          <Collapsible>
            <Collapsible.Header>
              <Subheader>Pattern</Subheader>
            </Collapsible.Header>
            <Collapsible.Content>
              <img alt="" src="http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/swirl_pattern.png" />
            </Collapsible.Content>
          </Collapsible>
        </Legend.Panel>
      </Legend>
    </div>
  )).add('With custom theme', () => (
    <div>
      <ThemeProvider theme={CUSTOM_THEME}>
        <Legend>
          <Legend.Panel>
            <Collapsible>
              <Collapsible.Header>
                <Subheader>Global Index</Subheader>
              </Collapsible.Header>
              <Collapsible.Content>
                <Toggle htmlFor="active">
                  <Text>Active</Text>
                </Toggle>
              </Collapsible.Content>
            </Collapsible>
          </Legend.Panel>
          <Legend.Panel>
            <Collapsible>
              <Collapsible.Header>
                <Subheader>Pattern</Subheader>
              </Collapsible.Header>
              <Collapsible.Content>
                <img alt="" src="http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/swirl_pattern.png" />
              </Collapsible.Content>
            </Collapsible>
          </Legend.Panel>
        </Legend>
      </ThemeProvider>
    </div>
  ));
