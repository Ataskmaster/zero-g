import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TextInput,
  Button,
  Box
} from "grommet";
import Fuse from "fuse.js";
import styled from "styled-components";

const StyledBox = styled.div`
  display: "flex";
  justify-content: "center";
  height: "100vh";
  width: "70vw";
  background-color: "#333";
`;

export const Subscribe = () => {
  const [list] = useState([
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

  const [user, setUser] = useState([2, 3]);

  let dupUser = [...user];

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
    <StyledBox>
      <TextInput
        placeholder="start typing your project name"
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
            {data.map((item, _index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell scope="row">
                    <strong>{item.projectId}</strong>
                  </TableCell>
                  <TableCell>{item.projectName}</TableCell>
                  <TableCell>
                    <Button
                      label={
                        dupUser.indexOf(item.id) === -1
                          ? "Subscribe"
                          : "Unsubscribe"
                      }
                      value={item.id}
                      color="#55CCCC"
                      onClick={
                        dupUser.indexOf(item.id) === -1
                          ? () => {
                              dupUser.push(item.id);
                              setUser(dupUser);
                            }
                          : () => {
                              dupUser.splice(dupUser.indexOf(item.id), 1);
                              setUser(dupUser);
                            }
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </center>
    </StyledBox>
  );
};
