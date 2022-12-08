import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconArcade from "../../assets/images/icon-arcade.svg";
import iconPro from "../../assets/images/icon-pro.svg";

export default function Plans({ activeStep, setActiveStep }) {
  const [yearly, setYearly] = useState(
    JSON.parse(localStorage.getItem("yearly")) || false
  );
  const [plan, setPlan] = useState(
    JSON.parse(localStorage.getItem("plan")) || null
  );
  const planData = [
    {
      subscriber: "Arcade",
      image: iconArcade,
      amount: "9",
    },
    {
      subscriber: "Advanced",
      image: iconAdvanced,
      amount: "12",
    },
    {
      subscriber: "Pro",
      image: iconPro,
      amount: "15",
    },
  ];
  // const planYearlyData = [
  //   {
  //     subscriber: "Arcade",
  //     image: iconArcade,
  //     amount: "$90/yr",
  //   },
  //   {
  //     subscriber: "Advanced",
  //     image: iconAdvanced,
  //     amount: "$120/yr",
  //   },
  //   {
  //     subscriber: "Pro",
  //     image: iconPro,
  //     amount: "$15/yr",
  //   },
  // ];
  // const planData = !yearly ? planMonthlyData : planYearlyData;
  const handleChange = () => {
    setYearly(!yearly);
  };
  const handlePlan = (value) => {
    const planSelected = planData?.filter(
      (item) => item?.subscriber === value?.subscriber
    );
    setPlan(planSelected);
  };
  useEffect(() => {
    if (plan) {
      localStorage.setItem("plan", JSON.stringify(plan));
      localStorage.setItem("yearly", yearly);
    }
  }, [plan, yearly]);
  return (
    <>
      <Box mt={7.5}>
        <StyledHeading>
          <FormattedMessage id="PLAN_INFO" />
        </StyledHeading>
        <StyledTypo>
          <FormattedMessage id="PLAN_INFO_TEXT" />
        </StyledTypo>
      </Box>
      <Grid
        item
        mt={2}
        xs={12}
        sm={12}
        md={10}
        // style={{ textAlign: "left", cursor: "pointer" }}
      >
        <Box display="flex" flexWrap={{ xs: "wrap", sm: "no-wrap" }}>
          {planData &&
            planData?.map((item) => (
              <Grid item xs={12} sm={12} md={4}>
                <Stack
                  onClick={() => handlePlan(item)}
                  direction={{ xs: "row", sm: "column" }}
                  spacing={7}
                  mx={{ xs: 0, sm: 1 }}
                  my={{ xs: 2, sm: 0 }}
                  p={{ xs: 3.75, sm: 1.5 }}
                  sx={
                    plan?.[0]?.subscriber === item?.subscriber
                      ? {
                          border: "1px solid #02295A",
                          borderRadius: "10px",
                          background: "hsl(231, 100%, 99%)",
                          cursor: "pointer",
                        }
                      : {
                          border: "1px solid #D6D9E6",
                          borderRadius: "10px",
                          cursor: "pointer",
                          "&.active": {
                            border: "1px solid red",
                          },
                        }
                  }
                >
                  <img src={item?.image} alt={item.subscriber} width={45} />
                  <Box>
                    <StyledSubscriber sx={{ fontSize: "20px" }}>
                      {item?.subscriber}
                    </StyledSubscriber>
                    <StyledAmount>
                      {!yearly
                        ? `$${item?.amount}/mo`
                        : `$${item?.amount * 10}/yr`}
                    </StyledAmount>
                    {yearly && (
                      <StyledAmount style={{ color: "#02295A" }}>
                        2 months free
                      </StyledAmount>
                    )}
                  </Box>
                </Stack>
              </Grid>
            ))}
        </Box>
        <Box
          my={5}
          py={1}
          sx={{
            background: "hsl(217, 100%, 97%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <StyledSubscriber sx={{ color: yearly ? "#9699AB" : "#02295A" }}>
            Monthly
          </StyledSubscriber>
          <StyledSwitch checked={yearly} onChange={handleChange} />
          <StyledSubscriber sx={{ color: !yearly ? "#9699AB" : "#02295A" }}>
            Yearly
          </StyledSubscriber>
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
            disabled={!plan}
            onClick={() => {
              setActiveStep(activeStep + 1);
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
});
const StyledButton = styled(Button)({
  color: "hsl(0, 0%, 100%)",
  background: "#02295A",
  fontFamily: "Ubuntu Medium",
  fontSize: "16px",
  textTransform: "capitalize",
  padding: "10px 30px !important",
  borderRadius: "8px !important",
  "&:disabled": {
    color: "#9699AB",
    background: "#FFFFFF",
    border: "1px solid hsl(231, 11%, 63%)",
  },
  "&:hover , &:active": {
    color: "hsl(0, 0%, 100%)",
    background: "#02295A",
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
const StyledSwitch = styled(Switch)({
  color: "#02295A",
  fontFamily: "Ubuntu Regular",
  "& .MuiSwitch-root": {
    color: "black !important",
    background: "blue !important",
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#02295A !important",
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
    backgroundColor: "green !important",
  },
});
