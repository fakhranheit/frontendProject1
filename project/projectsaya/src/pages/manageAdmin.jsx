import React, { Component } from "react";
import { Table, Button } from 'react-bootstrap'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import TableAdmin1 from '../components/tabelAdmin1'

class Admin extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-admin">

          <div style={{ margin: '0 auto' }}>
            <h1 style={{ color: 'white' }}>MANAGE STORE</h1>

            <Tabs defaultTab="vertical-tab-one" vertical>

              {/* TAB KIRI */}
              <TabList className="tab-kiri">
                <Tab tabFor="vertical-tab-one" style={{ color: 'white' }}>Product</Tab>
                <Tab tabFor="vertical-tab-two" style={{ color: 'white' }}>Transaction</Tab>
                <Tab tabFor="vertical-tab-three" style={{ color: 'white' }}> Users </Tab>
              </TabList>

              {/* TAB KANAN */}
              <div className="tab-kanan">
                <TabPanel tabId="vertical-tab-one">
                  <TableAdmin1 />
                </TabPanel>

                <TabPanel tabId="vertical-tab-two">
                  <p>Tab 2 content</p>
                </TabPanel>

                <TabPanel tabId="vertical-tab-three">
                  <p>Tab 3 content</p>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
