import {
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

export default function Addons({ activeStep, setActiveStep }) {
  const addons = [
    {
      addon: "Online service",
      addonsDesc: "Access to multiplayer games",
      addonAmount: 1,
    },
    {
      addon: "Larger storage",
      addonsDesc: "Extra 1TB of cloud save",
      addonAmount: 2,
    },
    {
      addon: "Customizable profile",
      addonsDesc: "Custom theme on your profile",
      addonAmount: 2,
    },
  ];
  const [selectedAddon, setSelectedAddon] = useState(
    JSON.parse(localStorage.getItem("addons")) || []
  );
  const yearly = JSON.parse(localStorage.getItem("yearly"));
  const handleClick = (data) => {
    let newSelected = [];
    const index = selectedAddon?.findIndex((row) => row?.addon === data?.addon);
    if (index === -1) {
      newSelected = newSelected.concat(selectedAddon, data);
    }
    if (index === 0) {
      newSelected = newSelected.concat(selectedAddon.slice(index + 1));
    }
    if (index > 0) {
      newSelected = newSelected.concat(
        selectedAddon.slice(0, index),
        selectedAddon.slice(index + 1)
      );
    }
    setSelectedAddon(newSelected);
  };
  return (
    <>
      <Box mt={7.5}>
        <StyledHeading>
          <FormattedMessage id="ADD_ONS" />
        </StyledHeading>
        <StyledTypo>
          <FormattedMessage id="ADD_ONS_TEXT" />
        </StyledTypo>
      </Box>

      <Grid item mt={2} xs={12} sm={12} md={8} style={{ textAlign: "left" }}>
        <Stack direction="column" spacing={2}>
          {addons?.map((item) => {
            const isSelected = selectedAddon?.findIndex(
              (row) => row?.addon === item?.addon
            );
            return (
              <Stack
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={1.25}
                py={2}
                sx={
                  isSelected !== -1
                    ? {
                        border: "1px solid #02295A",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }
                    : {
                        border: "1px solid #D6D9E6",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }
                }
                onClick={() => handleClick(item)}
              >
                <Box display="flex" alignItems="center" spacing={2}>
                  <StyledCheckbox checked={isSelected !== -1} />
                  <Box>
                    <StyledSubscriber>{item?.addon}</StyledSubscriber>
                    <StyledAmount>{item?.addonsDesc}</StyledAmount>
                  </Box>
                </Box>
                <Box>
                  <StyledAddonAmount>
                    {!yearly
                      ? `$${item?.addonAmount}/mo`
                      : `$${item?.addonAmount * 10}/yr`}
                  </StyledAddonAmount>
                </Box>
              </Stack>
            );
          })}
        </Stack>
        <Box py={7} display="flex" justifyContent="space-between">
          <StyledBackButton
            onClick={() => setActiveStep(activeStep - 1)}
            px={1.25}
            py={3.75}
            sx={{ color: "#9699AB", background: "transparent" }}
          >
            Go Back
          </StyledBackButton>
          <StyledButton
            onClick={() => {
              setActiveStep(activeStep + 1);
              localStorage.setItem("addons", JSON.stringify(selectedAddon));
            }}
            px={1.25}
            py={3.75}
          >
            Next Step
          </StyledButton>
        </Box>
      </Grid>
    </>
  );
}
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
  textTransform: "capitalize",
});
const StyledAmount = styled(Typography)({
  color: "#9699AB",
  fontFamily: "Ubuntu Regular",
  textAlign: "left",
  textTransform: "none",
  fontSize: "14px",
});
const StyledAddonAmount = styled(Typography)({
  color: "#473DFF",
  fontFamily: "Ubuntu Regular",
  textAlign: "left",
  textTransform: "none",
  fontSize: "14px",
});
const StyledCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "#473DFF",
  },
});

const StyledButton = styled(Button)({
  color: "hsl(0, 0%, 100%)",
  background: "#02295A",
  fontFamily: "Ubuntu Medium",
  fontSize: "16px",
  textTransform: "capitalize",
  padding: "10px 30px !important",
  borderRadius: "8px !important",

  "&:hover , &:active": {
    background: "hsl(0, 0%, 100%)",
    color: "#02295A",
    border: "1px solid hsl(231, 11%, 63%)",
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
