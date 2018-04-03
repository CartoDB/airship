import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './input';

storiesOf('Input', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input />

      <h3 className="header">With placeholder</h3>
      <Input placeholder="This is a test"/>

      <h3 className="header">With label</h3>
      <Input placeholder="This is a test" label="First Name"/>

      <h3 className="header">With value</h3>
      <Input
        placeholder="This is a test"
        label="First Name"
        value="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        placeholder="This is a test"
        label="First Name"
        value="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input disabled />

      <h3 className="header">With placeholder</h3>
      <Input disabled placeholder="This is a test"/>

      <h3 className="header">With label</h3>
      <Input disabled placeholder="This is a test" label="First Name"/>

      <h3 className="header">With value</h3>
      <Input
        disabled
        placeholder="This is a test"
        label="First Name"
        value="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        disabled
        placeholder="This is a test"
        label="First Name"
        value="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('Read only', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input readOnly />

      <h3 className="header">With placeholder</h3>
      <Input readOnly placeholder="This is a test"/>

      <h3 className="header">With label</h3>
      <Input readOnly placeholder="This is a test" label="First Name"/>

      <h3 className="header">With value</h3>
      <Input
        readOnly
        placeholder="This is a test"
        label="First Names"
        value="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        readOnly
        placeholder="This is a test"
        label="First Names"
        value="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('With error', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input error="This field is required" />

      <h3 className="header">With placeholder</h3>
      <Input error="This field is required" placeholder="This is a test"/>

      <h3 className="header">With label</h3>
      <Input error="This field is required" placeholder="This is a test" label="First Name"/>

      <h3 className="header">With value</h3>
      <Input
        error="This field is required"
        placeholder="This is a test"
        label="First Name"
        value="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        error="This field is required"
        placeholder="This is a test"
        label="First Name"
        value="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('Different types', () => (
    <div>
      <h3 className="header">Text</h3>
      <Input value="Wadus" />

      <h3 className="header">Email</h3>
      <Input type="email" value="wadus@carto.com" />

      <h3 className="header">Number</h3>
      <Input type="number" value="5" />

      <h3 className="header">Date</h3>
      <Input type="date" value="1991-02-05" />

      <h3 className="header">Color</h3>
      <Input type="color" value="#FABADA" />

      <h3 className="header">Password</h3>
      <Input type="password" value="its a secret" />

      <h3 className="header">Time</h3>
      <Input type="time" value="15:30" />

      <h3 className="header">File</h3>
      <Input type="file" />
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">onChange event</h3>
      <Input
        placeholder="Type here to see the event"
        onChange={action('Input changed')}
      />
    </div>
  ));
