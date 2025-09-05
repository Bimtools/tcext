import { Button, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import * as WorkspaceAPI from "trimble-connect-workspace-api";
import { ObjectView } from 'react-object-view'

const { Text } = Typography;
const SelectionFilter = () => {
  const [fieldValue, setFieldValue] = useState("");
  const [properties, setProperties] = useState();
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: "5px",
          rowGap: "5px",
          margin: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "5px",
            marginLeft: "5px",
            marginRight: "5px",
            columnGap: "2px",
          }}
        >
          <Text style={{ width: "60px" }}>Value</Text>
          <Input
            placeholder="Field Value"
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <Button
            type="primary"
            onClick={async () => {
              const tcapi = await WorkspaceAPI.connect(window.parent);
              const models = await tcapi.viewer.getObjects({
                parameter: {
                  properties: { "PART.PART_POS": "0" },
                  properties: { "PART.CLASS_ATTR": "507" },
                },
              });
              console.log(models);
              const properties = await tcapi.viewer.getObjectProperties(
                "_dYTxqbWG30",
                [890]
              );
              setProperties(properties[0].properties)
              console.log(properties);
            }}
          >
            Select
          </Button>
        </div>
        <ObjectView data={properties}/>
      </div>
    </>
  );
};

export default SelectionFilter;
