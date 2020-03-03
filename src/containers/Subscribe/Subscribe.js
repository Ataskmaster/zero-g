import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TextInput
} from "grommet";
import Fuse from "fuse.js";
import styled from "styled-components";

export const Subscribe = () => {
  const [list, setList] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald"
    },
    {
      id: 2,
      title: "The DaVinci Code",
      author: "Dan Brown"
    },
    {
      id: 3,
      title: "Angels & Demons",
      author: "Dan Brown"
    }
  ]);

  const [query, setQuery] = useState("");

  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["title", "author"]
  };
  let fuse = new Fuse(list, options);

  const data = query ? fuse.search(query) : list;

  // searchHandler = event => {
  //   setList(fuse.search(event.target.value));
  // };

  return (
    <div>
      <TextInput
        placeholder="search"
        onChange={event => setQuery(event.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Title
            </TableCell>
            <TableCell scope="col" border="bottom">
              Author
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow>
                <TableCell scope="row">
                  <strong>{item.title}</strong>
                </TableCell>
                <TableCell>{item.author}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
