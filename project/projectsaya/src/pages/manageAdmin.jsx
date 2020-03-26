import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import TabelProduct from '../components/tabelProduct'
import TabelGenre from '../components/tabelGenre'
import TabelTransaction from '../components/tabelTransaction'
import SalesReport from '../components/salesReport'
import { connect } from 'react-redux'

class Admin extends Component {
  render() {

    if (this.props.role === 'admin') {
      return (
        <div>
          <div className="tab-admin">

            <div style={{ margin: '0 auto' }}>
              <h3 style={{ color: 'white' }}>MANAGE STORE</h3>

              <Tabs defaultTab="vertical-tab-one" vertical>

                {/* TAB KIRI */}
                <TabList className="tab-kiri">
                  <Tab tabFor="vertical-tab-one" style={{ color: 'white' }}>Product</Tab>
                  <Tab tabFor="vertical-tab-two" style={{ color: 'white' }}>Genre</Tab>
                  <Tab tabFor="vertical-tab-three" style={{ color: 'white' }}> Transaction </Tab>
                  <Tab tabFor="vertical-tab-four" style={{ color: 'white' }}> Sales Report </Tab>
                </TabList>

                {/* TAB KANAN */}
                <div className="tab-kanan">
                  <TabPanel tabId="vertical-tab-one">
                    <TabelProduct />
                  </TabPanel>

                  <TabPanel tabId="vertical-tab-two">
                    <TabelGenre />
                  </TabPanel>

                  <TabPanel tabId="vertical-tab-three">
                    <TabelTransaction />
                  </TabPanel>

                  <TabPanel tabId="vertical-tab-four">
                    <SalesReport />
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <h1>HARUS ADMIN</h1>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, {})(Admin);
