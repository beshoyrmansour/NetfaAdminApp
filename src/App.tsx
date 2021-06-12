import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


import './App.css';
import Header from './components/Header';
import Products from './pages/products/Products';
import Orders from './pages/Orders';
import Users from './pages/Users/Users';
import Settings from './pages/Settings';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StylesProvider jss={jss}>
      <div className="App">
        <Header value={value} handleChange={handleChange} />
        <Container maxWidth="lg">
          <TabPanel value={value} index={0}>
            <Products />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Orders />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Users />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Settings />
          </TabPanel>
        </Container>
      </div>
    </StylesProvider>
  );
}

export default App;
