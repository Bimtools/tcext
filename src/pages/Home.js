import { Layout } from "antd";
import React from "react";
import SelectionFilter from "../components/SelectionFilter";
import * as WorkspaceAPI from "trimble-connect-workspace-api";

const Home = () => {
  
  return (
    <Layout>
      <SelectionFilter />
    </Layout>
  );
};

export default Home;
