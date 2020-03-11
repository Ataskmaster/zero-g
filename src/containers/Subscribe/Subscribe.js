import React, { useState, useEffect } from "react";
import {
  Grommet,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TextInput,
  Button,
  Box
} from "grommet";
import theme from "../../utils/theme";

export const Subscribe = () => {
  const [projects, setProjects] = useState([]);

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setProjects([
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
      },
      {
        id: 4,
        projectId: "ZG",
        projectName: "Zero-G"
      }
    ]);
    setSubscriptions([1, 3]);
  }, []);

  const [query, setQuery] = useState("");

  let dupSubscriptions = [...subscriptions];
  let data = [...projects];
  let search = query.trim().toLowerCase();
  if (search.length > 0) {
    search = search.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&");
    data = data.filter(function(item) {
      return (item.projectId + " " + item.projectName)
        .toLowerCase()
        .match(search);
    });
  }

  return (
    <Grommet theme={theme}>
      <Box justify="center" align="center" alignContent="center" gap="medium">
        <Box width="xlarge">
          <TextInput
            placeholder="start typing your project name"
            onChange={event => setQuery(event.target.value)}
            size="medium"
            autoFocus
          />
        </Box>
        <Box>
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
                          dupSubscriptions.indexOf(item.id) === -1
                            ? "Subscribe"
                            : "Unsubscribe"
                        }
                        value={item.id}
                        primary
                        color={
                          dupSubscriptions.indexOf(item.id) === -1
                            ? "#03fc98"
                            : "#fcba03"
                        }
                        onClick={
                          dupSubscriptions.indexOf(item.id) === -1
                            ? () => {
                                dupSubscriptions.push(item.id);
                                setSubscriptions(dupSubscriptions);
                              }
                            : () => {
                                dupSubscriptions.splice(
                                  dupSubscriptions.indexOf(item.id),
                                  1
                                );
                                setSubscriptions(dupSubscriptions);
                              }
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Grommet>
  );
};
