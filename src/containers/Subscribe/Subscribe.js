import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TextInput,
  Button
} from "grommet";
import Fuse from "fuse.js";
import styled from "styled-components";

export const Subscribe = () => {
  const [list, setList] = useState([
    {
      id: 1,
      projectId: "RNH",
      projectName: "Realtor New Homes"
    },
    {
      id: 2,
      projectId: "VW",
      projectName: "Verizon Wireless"
    },
    {
      id: 3,
      projectId: "MCP",
      projectName: "Mastercard Cashless Payments"
    }
  ]);

  const [query, setQuery] = useState("");

  const options = {
    shouldSort: true,
    threshold: 0.2,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["projectId", "projectName"]
  };
  let fuse = new Fuse(list, options);

  const data = query ? fuse.search(query) : list;

  return (
    <div>
      <TextInput
        placeholder="search"
        onChange={event => setQuery(event.target.value)}
      />
      <center>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Project ID
              </TableCell>
              <TableCell scope="col" border="bottom">
                Project Name
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell scope="row">
                    <strong>{item.projectId}</strong>
                  </TableCell>
                  <TableCell>{item.projectName}</TableCell>
                  <TableCell>
                    <Button
                      label="Subscribe"
                      color="#55CCCC"
                      onClick={() => {}}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </center>
    </div>
  );
};
