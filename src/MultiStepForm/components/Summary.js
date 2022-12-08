import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import thankyouIcon from "../../assets/images/icon-thank-you.svg";
import { FormattedMessage } from "react-intl";

export default function Summary({ activeStep, setActiveStep }) {
  const yearly = JSON.parse(localStorage.getItem("yearly"));
  const plan = JSON.parse(localStorage.getItem("plan"));
  const addons = JSON.parse(localStorage.getItem("addons"));
  const [confirm, setConfirm] = useState(false);
  const getTotalAmount = () => {
    let addonsTotal = addons?.reduce((acc, curr) => acc + curr?.addonAmount, 0);
    if (yearly) {
      return (parseInt(addonsTotal, 10) + parseInt(plan?.[0]?.amount, 10)) * 10;
    } else {
      return parseInt(addonsTotal, 10) + parseInt(plan?.[0]?.amount, 10);
    }
  };
  return (
    <>
      {!confirm && (
        <>
          <Box mt={7.5}>
            <StyledHeading>
              <FormattedMessage id="SUMMARY_HEADING" />
            </StyledHeading>
            <StyledTypo>
              <FormattedMessage id="SUMMARY_TEXT" />
            </StyledTypo>
          </Box>
          <Grid
            item
            mt={2}
            xs={12}
            sm={12}
            md={10}
            style={{ textAlign: "left" }}
          >
            <Stack
              direction="column"
              px={4}
              py={3}
              sx={{ background: "hsl(217, 100%, 97%)", borderRadius: "8px" }}
            >
              {plan?.map((row) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <StyledSubscriber>
                      {!yearly
                        ? `${row?.subscriber} (Monthly)`
                        : `${row?.subscriber} (Yearly)`}
                    </StyledSubscriber>
                    <StyledLink onClick={() => setActiveStep(1)}>
                      Change
                    </StyledLink>
                  </Box>
                  <StyledSubscriber>
                    {!yearly ? `$${row?.amount}/mo` : `$${row?.amount * 10}/yr`}
                  </StyledSubscriber>
                </Box>
              ))}
              {addons?.length > 0 && <Divider sx={{ margin: "25px 0" }} />}
              {addons?.map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={0.5}
                >
                  <StyledAmount>{item?.addon}</StyledAmount>
                  <StyledAddonAmount>
                    {!yearly
                      ? `$${item?.addonAmount}/mo`
                      : `$${item?.addonAmount * 10}/yr`}
                  </StyledAddonAmount>
                </Box>
              ))}
            </Stack>
            <Box display="flex" justifyContent="space-between" px={4} py={3}>
              <StyledAmount>
                {!yearly ? `Total (per month)` : `Total (per year)`}
              </StyledAmount>
              <StyledTotalAmount>
                {!yearly
                  ? `$${getTotalAmount()}/mo`
                  : `$${getTotalAmount()}/yr`}
              </StyledTotalAmount>
            </Box>
            <Box py={7} display="flex" justifyContent="space-between">
              <StyledBackButton
                onClick={() => setActiveStep(activeStep - 1)}
                px={1.25}
                py={3.75}
              >
                Go Back
              </StyledBackButton>
              <StyledButton
                onClick={() => {
                  setConfirm(true);
                  localStorage.clear();
                }}
                px={1.25}
                py={3.75}
              >
                Confirm
              </StyledButton>
            </Box>
          </Grid>
        </>
      )}
      {confirm && (
        <Box my={{ xs: 10, md: 25 }} mx={{ xs: 2.5, md: 14 }}>
          <img src={thankyouIcon} alt="thankyouIcon" />
          <StyledHeading sx={{ textAlign: "center" }}>
            <FormattedMessage id="THANK_YOU" />
          </StyledHeading>
          <StyledAmount sx={{ textAlign: "center" }}>
            <FormattedMessage id="THANK_YOU_NOTE" />
          </StyledAmount>
        </Box>
      )}
    </>
  );
}
const StyledButton = styled(Button)({
  color: "hsl(0, 0%, 100%)",
  background: "#473DFF",
  fontFamily: "Ubuntu Regular",
  fontSize: "18px",
  textTransform: "capitalize",
  padding: "10px 30px !important",
  borderRadius: "8px !important",
  "&:hover , &:active": {
    background: "#ADBEFF",
    color: "#FFF",
  },
});

const StyledHeading = styled(Typography)({
  color: "#02295A",
  fontFamily: "Ubuntu Bold",
  fontSize: "30px",
  textAlign: "left",
});
const StyledTypo = styled(Typography)({
  color: "hsl(231, 11%, 63%)",
  fontFamily: "Ubuntu Regular",
  textAlign: "left",
});
const StyledSubscriber = styled(Typography)({
  color: "#02295A",
  fontFamily: "Ubuntu Bold",
  textAlign: "left",
  fontSize: "14px",
});
const StyledAmount = styled(Typography)({
  color: "#9699AB",
  fontFamily: "Ubuntu Regular",
  textAlign: "left",
  textTransform: "none",
});
const StyledAddonAmount = styled(Typography)({
  color: "#473DFF",
  fontFamily: "Ubuntu Regular",
  textAlign: "left",
  textTransform: "none",
  fontSize: "14px",
});
const StyledTotalAmount = styled(Typography)({
  color: "#473DFF",
  fontFamily: "Ubuntu Bold",
  textAlign: "left",
});
const StyledLink = styled(Link)({
  color: "#9699AB",
  fontFamily: "Ubuntu Medium",
  textAlign: "left",
  textTransform: "none",
  textDecorationColor: "#9699AB",
  cursor: "pointer",
  "&:hover": {
    color: "#473DFF",
    textDecorationColor: "#473DFF",
  },
});
const StyledBackButton = styled(Button)({
  color: "#9699AB",
  background: "transparent",
  fontFamily: "Ubuntu Medium",
  fontSize: "16px",
  textTransform: "capitalize",
  padding: "10px 30px !important",
  borderRadius: "8px !important",
  "&:hover , &:active": {
    color: "#02295A",
    background: "transparent",
  },
});
