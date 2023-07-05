import { Card, Grid, Text, Link, Textarea } from "@nextui-org/react";
import { styled } from "@stitches/react";

const CenteredText = styled(Text, {
  textAlign: "center",
  width: "100%",
});

export default function TextBox() {
  return (
    <Card
      css={{
        p: "$6",
        maxWidth: "auto", // Adjust the width here as per your requirement
        maxHeight: "100vh",
        fs: "auto",
        display: "flex",
        flexDirection: "column",
        width: "75%",
      }}
    >
      <Card.Header>
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <CenteredText
              h4
              css={{ lineHeight: "$xs", mw: "100vw", marginBottom: "-15px" }}
            >
              Save your favorite npm packages in one place!
            </CenteredText>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$12", fs: "11px", flex: "1" }}>
        <Textarea />
      </Card.Body>
    </Card>
  );
}
