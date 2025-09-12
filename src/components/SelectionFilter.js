import { Button, Card, Collapse, Divider, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import * as WorkspaceAPI from "trimble-connect-workspace-api";
import { ObjectView } from "react-object-view";

const { Text } = Typography;
const SelectionFilter = () => {
  const [fieldValue, setFieldValue] = useState("");
  const [properties, setProperties] = useState([]);
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
              const propertyNames = [
                { "PART.PART_POS": fieldValue },
                { "ASSEMBLY.ASSEMBLY_POS": fieldValue },
                { "PART.CLASS_ATTR": fieldValue },
                { "PART.NAME": fieldValue },
                { "PART.MATERIAL": fieldValue },
                { "PART.PROFILE": fieldValue },
                { "PART.GUID": fieldValue },
                { "ASSEMBLY.GUID": fieldValue },
                { "IfcMaterial.Material": fieldValue },
                { "Material.Name": fieldValue },
                { "IfcBeamType.Name": fieldValue },
                { "Tekla Common.Class": fieldValue },
              ];
              var objectProperties = [];
              for (const item of propertyNames) {
                const objectIds = await tcapi.viewer.getObjects({
                  parameter: {
                    properties: { ...item },
                  },
                });
                objectIds.forEach(async (x) => {
                  const ids = x.objects.map((x) => x.id);
                  if (ids.length === 0) return;
                  const properties = await tcapi.viewer.getObjectProperties(
                    x.modelId,
                    [...ids]
                  );
                  for (const k of properties) {
                    console.log(k);
                    let position = "";
                    let key = "";
                    let name = k.product.name;
                    let partPos = "";
                    let assemblyPos = "";
                    let profile = "";
                    let material = "";
                    let weight = 0;
                    let length = 0;
                    for (const g of k.properties) {
                      for (const f of g.properties) {
                        if (f.name.toUpperCase().includes("GUID") && key === "")
                          key = f.value;
                        if (
                          f.name.toUpperCase().includes("NAME") &&
                          name === ""
                        )
                          name = f.value;
                        if (
                          f.name.toUpperCase().includes("PART_POS") &&
                          partPos === ""
                        )
                          partPos = f.value;
                        if (
                          f.name.toUpperCase().includes("ASSEMBLY_POS") &&
                          assemblyPos === ""
                        ) {
                          assemblyPos = f.value;
                          position = f.value;
                        }
                        if (
                          f.name.toUpperCase().includes("MAINPART.PROFILE") &&
                          profile === ""
                        )
                          profile = f.value;
                        if (
                          f.name.toUpperCase().includes("WEIGHT") &&
                          weight === ""
                        )
                          weight = f.value;
                        if (
                          f.name.toUpperCase().includes("LENGTH") &&
                          length === ""
                        )
                          length = f.value;
                      }
                    }
                    console.log(name)

                    objectProperties.push({
                      key: key,
                      label: `${position}`,
                      children: (
                        <>
                          <ul
                            tyle={{
                              paddingLeft: "20px",
                              textAlign: "left",
                            }}
                          >
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="1"
                            >{`Part Position: ${partPos}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="2"
                            >{`Assembly Position: ${assemblyPos}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="3"
                            >{`Name: ${name}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="4"
                            >{`Profile: ${profile}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="5"
                            >{`Material: ${material}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="6"
                            >{`Weight: ${weight}`}</li>
                            <li
                              tyle={{
                                paddingLeft: "20px",
                                textAlign: "left",
                              }}
                              key="7"
                            >{`Length: ${length}`}</li>
                          </ul>
                        </>
                      ),
                    });
                  }
                  await tcapi.viewer.setSelection(
                    {
                      modelObjectIds: [
                        {
                          modelId: x.modelId,
                          objectRuntimeIds: [...ids],
                        },
                      ],
                    },
                    "add"
                  );
                  await tcapi.viewer.setCamera({
                    modelObjectIds: [
                      {
                        modelId: x.modelId,
                        objectRuntimeIds: [...ids],
                      },
                    ],
                  });
                });
              }
              setProperties(objectProperties);
            }}
          >
            Select
          </Button>
        </div>
        <Divider orientation="left">Object Properties</Divider>

        <Collapse items={properties} />
      </div>
    </>
  );
};

export default SelectionFilter;
