"use client";

import { useState } from "react";
import { Card, Grid, Text, Table, Button, Spacer } from "@nextui-org/react";
import "src/app/globals.css";
import CopyButton from "@components/CopyButton";

interface RowItem {
  key: string;
  directions: string;
  status: string;
  copyable?: boolean;
  copied?: boolean; // Add copied property to track individual row's copied state
}

export default function App() {
  const columns = [
    {
      key: "role",
      label: "Run:",
      fitContent: true,
    },
  ];

  const initialRows: RowItem[] = [
    {
      key: "1",
      directions: "npm install -g npm-check-updates",
      status: "Active",
      copyable: true,
    },
    {
      key: "2",
      directions: "ncu --upgrade",
      status: "Active",
      copyable: true,
    },
    {
      key: "3",
      directions: "npm i",
      status: "Active",
      copyable: true,
    },
  ];

  const handleCopy = async (text: string, rowKey: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Text copied:", text);
        const updatedRows = rows.map((row) => {
          if (row.key === rowKey) {
            return { ...row, copied: true };
          }
          return row;
        });
        setRows(updatedRows);

        setTimeout(() => {
          const resetRows = rows.map((row) => {
            if (row.key === rowKey) {
              return { ...row, copied: false };
            }
            return row;
          });
          setRows(resetRows);
        }, 2000);
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    } else {
      console.log("Copy text using alternative method");
    }
  };

  const [rows, setRows] = useState(initialRows);

  return (
    <Card
      css={{
        p: "$3",
        minWidth: "60%",
        margin: "auto",
        mh: "auto",
        fs: "$xl",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <Spacer x={1} />
      <Card.Header>
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              Update all your npm packages all at once!
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2", fs: "11px" }}>
        <Table
          aria-label="Example table with dynamic content"
          css={{
            bg: "white",
            overflowX: "auto", // Add horizontal scroll if necessary
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body>
            {rows.map((item: RowItem) => (
              <Table.Row key={item.key}>
                {columns.map((column) => (
                  <Table.Cell
                    key={column.key}
                    css={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        column.key === "role" ? "flex-start" : "flex-end", // Align the content to the left or right
                    }}
                  >
                    <div
                      className={column.key === "role" ? "neumorphic-bg" : ""}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div>{item.directions}</div>
                      {item.copyable && (
                        <CopyButton
                          text={item.directions}
                          onCopy={() => handleCopy(item.directions, item.key)}
                        />
                      )}
                    </div>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  );
}
