import { useState, useEffect, Key } from "react";
import { Card, Grid, Text, Table, Spacer } from "@nextui-org/react";
import "src/app/globals.css";
import CopyButton from "./CopyButton";

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
    setRows((prevRows) => prevRows.map((row) => ({ ...row, copied: false })));

    return () => {
      setRows((prevRows) => prevRows.map((row) => ({ ...row, copied: false })));
    };
  }, []);

  function handleCopy(text: string): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      const copyText = "npx localview --port 3000";
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          console.log("Text copied:", copyText);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000); // Reset to "Copy" after 2 seconds (adjust the time as needed)
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    } else {
      console.log("Copy text using alternative method");
    }
  }

  return (
    <Card
      css={{
        minWidth: "100%",
        width: "auto",
        mh: "auto",
        fs: "$xl",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <Spacer x={1} />
      <Card.Header>
        <Grid.Container
          css={{
            pl: "$12",
            justifyContent: "center", // Center the content horizontally
          }}
        >
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs", textAlign: "center" }}>
              Access your localhost server on mobile.
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$6", fs: "11px", height: "80%" }}>
        <Table
          aria-label="Example table with dynamic content"
          css={{
            bg: "white",
            overflowX: "auto",
          }}
        >
          <Table.Header columns={columns}>
            {(column: { key: Key | null | undefined; label: any }) => (
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
function setCopied(arg0: boolean) {
  throw new Error("Function not implemented.");
}
