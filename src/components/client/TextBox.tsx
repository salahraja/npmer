"use client";
import { Card, Grid, Text, Link, Textarea } from "@nextui-org/react";

export default function TextBox() {
  return (
    <Card
      css={{
        p: "$6",
        mw: "auto", // Adjust the width here as per your requirement
        maxHeight: "100vh",
        fs: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card.Header>
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}></Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8", pt: "$9", mw: "1600px" }}>
              Save your favorite npm packages in one place!
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$12", fs: "11px", flex: "1" }}>
        <textarea></textarea>
      </Card.Body>
    </Card>
  );
}
