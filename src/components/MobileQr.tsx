import { useState, useEffect } from "react";
import { Card, Grid, Text, Table, Spacer } from "@nextui-org/react";
import "src/app/globals.css";
import CopyButton from "./CopyButton";
import NewRow from "./NewRow";

interface RowItem {
  key: string;
  directions: string;
  status: string;
  copyable?: boolean;
}

export default function MobileQr() {
  const columns = [
    {
      key: "role",
      label: "Steps:",
      fitContent: true,
    },
  ];

  const initialRows: RowItem[] = [
    {
      key: "1",
      directions:
        "Start your local server and take note of its PORT number (example: 3000).",
      status: "Active",
    },
    {
      key: "2",
      directions:
        "Create a QR code on terminal with: npx localview --port 3000",
      status: "Active",
      copyable: true,
    },
    {
      key: "3",
      directions: "Scan the QR code",
      status: "Active",
    },
  ];

  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    const handleCopy = async () => {
      const textToCopy = "npx localview --port 3000";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          console.log("Text copied:", textToCopy);
          setRows((prevRows) =>
            prevRows.map((row) => {
              if (row.directions === textToCopy) {
                return { ...row, copied: true };
              }
              return row;
            })
          );
        } catch (error) {
          console.error("Failed to copy text:", error);
        }
      } else {
        console.log("Copy text using alternative method");
      }
    };

    setRows((prevRows) => prevRows.map((row) => ({ ...row, copied: false })));

    return () => {
      setRows((prevRows) => prevRows.map((row) => ({ ...row, copied: false })));
    };
  }, []);

  function handleCopy(text: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card
      css={{
        p: "$6",
        minWidth: "60%",
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
              Access your localhost server on mobile.
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2", fs: "11px" }}>
        <Table
          aria-label="Example table with dynamic content"
          css={{
            bg: "white",
            overflowX: "auto",
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
                <Table.Cell key={columns[0].key} css={{}}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1 }}>{item.directions}</div>{" "}
                    {/* Use flex: 1 for equal width */}
                    {item.copyable && (
                      <CopyButton text={item.directions} onCopy={handleCopy} />
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  );
}
