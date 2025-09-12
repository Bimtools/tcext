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
                { Name: "BEAM" },
                { "PropertySet.PART_POS": fieldValue },
                { "PropertySet.NAME": fieldValue },
                { "PropertySet.ASSEMBLY_POS": fieldValue },
                { "PropertySet.PROFILE": fieldValue },
                { "PropertySet.MATERIAL": fieldValue },
                { "Tekla Common.Class": fieldValue },
                { "PART.PART_POS": fieldValue },
                { "ASSEMBLY.ASSEMBLY_POS": fieldValue },
                { "PART.CLASS_ATTR": fieldValue },
                { "PART.NAME": fieldValue },
                { "PART.MATERIAL": fieldValue },
                { "PART.PROFILE": fieldValue },
                { "PART.GUID": fieldValue },
                { "ASSEMBLY.GUID": fieldValue },
                { "TeklaAssembly.Assembly/Cast unit Mark": fieldValue },
              ];
              const modelObjects = await tcapi.viewer.getObjects({
                parameter: {
                  class: ["IFCBEAM", "IFCMEMBER", "IFCCOLUMN"],
                },
              });
              console.log(modelObjects);
              modelObjects.forEach(async (x) => {
                x.objects.forEach(async (o) => {
                  try {
                    const properties = await tcapi.viewer.getObjectProperties(
                      x.modelId,
                      [o.id]
                    );
                    console.log(properties);
                  } catch {}
                });
              });
              // for (const index in allObjIds) {
              //   const aaa = await tcapi.viewer.getObjectProperties(
              //     allObjIds[index].modelId,
              //     allObjIds[index].objects
              //   );
              //   console.log(aaa);
              // }

              // var objectProperties = [];
              // for (const item of propertyNames) {
              //   const objectIds = await tcapi.viewer.getObjects({
              //     parameter: {
              //       properties: { ...item },
              //     },
              //   });
              //   objectIds.forEach(async (x) => {
              //     const ids = x.objects.map((x) => x.id);
              //     if (ids.length === 0) return;
              //     const properties = await tcapi.viewer.getObjectProperties(
              //       x.modelId,
              //       [...ids]
              //     );

              //     for (const k of properties) {
              //       for (const g of k.properties) {
              //         if (g.name !== "ASSEMBLY" && g.name !== "PART") continue;
              //         const type = g.name;
              //         var key = "";
              //         var name = "";
              //         var partPos = "";
              //         var assemblyPos = "";
              //         var profile = "";
              //         var material = "";
              //         var weight = 0;
              //         var length = 0;
              //         if (type === "ASSEMBLY") {
              //           for (const f of g.properties) {
              //             if (f.name === "NAME") name = f.value;
              //             if (f.name === "PART_POS") partPos = f.value;
              //             if (f.name === "ASSEMBLY_POS") {
              //               assemblyPos = f.value;
              //               key = f.value;
              //             }
              //             if (f.name === "MAINPART.PROFILE") profile = f.value;
              //             if (f.name === "WEIGHT") weight = f.value;
              //             if (f.name === "LENGTH") length = f.value;
              //           }
              //         } else if (type == "PART") {
              //           for (const f of g.properties) {
              //             if (f.name === "NAME") name = f.value;
              //             if (f.name === "PART_POS") {
              //               key = f.value;
              //               partPos = f.value;
              //             }
              //             if (f.name === "ASSEMBLY_POS") assemblyPos = f.value;
              //             if (f.name === "PROFILE") profile = f.value;
              //             if (f.name === "WEIGHT") weight = f.value;
              //             if (f.name === "LENGTH") length = f.value;
              //             if (f.name === "MATERIAL") material = f.value;
              //           }
              //         }
              //         const index1 = objectProperties.findIndex(
              //           (x) =>
              //             x.type === "ASSEMBLY" && x.assemblyPos === assemblyPos
              //         );
              //         const index2 = objectProperties.findIndex(
              //           (x) => x.type === "PART" && x.partPos === partPos
              //         );

              //         if (
              //           (index1 < 0 && type === "ASSEMBLY") ||
              //           (index2 < 0 && type === "PART")
              //         ) {
              //           objectProperties.push({
              //             key: partPos + assemblyPos,
              //             label: `${type}: ${key}`,
              //             children: (
              //               <>
              //                 <ul
              //                   tyle={{
              //                     paddingLeft: "20px",
              //                     textAlign: "left",
              //                   }}
              //                 >
              //                   <li key="1">{`Part Position: ${partPos}`}</li>
              //                   <li key="2">{`Assembly Position: ${assemblyPos}`}</li>
              //                   <li key="3">{`Name: ${name}`}</li>
              //                   <li key="4">{`Profile: ${profile}`}</li>
              //                   <li key="5">{`Material: ${material}`}</li>
              //                   <li key="6">{`Weight: ${weight}`}</li>
              //                   <li key="7">{`Length: ${length}`}</li>
              //                 </ul>
              //               </>
              //             ),
              //           });
              //         }
              //       }
              //     }
              //     await tcapi.viewer.setSelection(
              //       {
              //         modelObjectIds: [
              //           {
              //             modelId: x.modelId,
              //             objectRuntimeIds: [...ids],
              //           },
              //         ],
              //       },
              //       "add"
              //     );
              //     await tcapi.viewer.setCamera({
              //       modelObjectIds: [
              //         {
              //           modelId: x.modelId,
              //           objectRuntimeIds: [...ids],
              //         },
              //       ],
              //     });
              //   });
              // }
              // setProperties(objectProperties);
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
