import {
  Box,
  Grid,
  Paper,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import "../App.css";
import desktopBg from "../assets/images/bg-sidebar-desktop.svg";
import mobileBg from "../assets/images/bg-sidebar-mobile.svg";
import Addons from "./components/Addons";
import PersonalInfo from "./components/PersonalInfo";
import Plans from "./components/Plans";
import Summary from "./components/Summary";

function MultiStepForm() {
  const steps = [
    {
      label: "STEP-1",
      description: "Your info",
    },
    {
      label: "STEP-2",
      description: "Select plan",
    },
    {
      label: "STEP-3",
      description: "ADD-ONS",
    },
    {
      label: "STEP-4",
      description: "SUMMARY",
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log("isMobile", isMobile);
  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      <Grid item xs={12} p={{ xs: 1, md: 3 }}>
        <StyledPaper elevation={0}>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={2}
            columnGap={6}
          >
            <Grid item xs={12} sm={12} md={4}>
              <StyledBox pt={5}>
                <StyledStepper
                  activeStep={activeStep}
                  orientation={isMobile ? "horizontal" : "vertical"}
                  connector={<StepConnector />}
                >
                  {steps?.map((step, index) => (
                    <Step key={step.label}>
                      <StyledStepLabel
                        optional={
                          !isMobile && (
                            <StyledDesc variant="caption">
                              {step.description}
                            </StyledDesc>
                          )
                        }
                      >
                        {!isMobile && step.label}
                      </StyledStepLabel>
                    </Step>
                  ))}
                </StyledStepper>
              </StyledBox>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              sx={
                isMobile
                  ? {
                      margin: "0 20px",
                      boxShadow: "0 2px 16px #d6d9e6",
                      background: "#FFFFFF",
                      borderRadius: "8px",
                      position: "absolute",
                      top: "110px",
                    }
                  : {
                      background: "#FFFFFF",
                      borderRadius: "8px",
                    }
              }
            >
              <StyledBox1>
                {activeStep === 0 && (
                  <PersonalInfo
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    isMobile={isMobile}
                  />
                )}
                {activeStep === 1 && (
                  <Plans
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    isMobile={isMobile}
                  />
                )}
                {activeStep === 2 && (
                  <Addons
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    isMobile={isMobile}
                  />
                )}
                {activeStep === 3 && (
                  <Summary
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                  />
                )}
              </StyledBox1>
            </Grid>
          </Stack>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

export default MultiStepForm;

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 2px 16px #A5A5A529",
  border: "1px solid #DDDDDD",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0px",
    background: "transparent 0% 0% no-repeat padding-box",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  background: `url(${desktopBg})`,
  backgroundSize: "cover",
  height: "568px",
  backgroundPosition: "center",
  borderRadius: "8px",
  alignItems: "baseline",
  margin: "20px  !important",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    background: `url(${mobileBg})`,
    backgroundSize: "contain",
    height: "300px",
    backgroundRepeat: "no-repeat",
    borderRadius: "0px",
    margin: "0px  !important",
  },
}));

const StyledBox1 = styled(Box)({
  margin: "20px !important",
});

const StyledDesc = styled(Typography)({
  fontSize: "16px",
  color: "#FFFFFF",
  fontFamily: "Ubuntu Bold",
  textTransform: "uppercase",
});

const StyledStepper = styled(Stepper)({
  "& .MuiStepConnector-line": {
    borderLeftWidth: "0px",
  },
});

const StyledStepLabel = styled(StepLabel)({
  "& .MuiStepLabel-label": {
    color: "#9699AB",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "#9699AB",
  },
  "& .MuiStepIcon-root": {
    color: "transparent !important",
    transform: "scale(1.25)",
    border: "1px solid #FFFFFF",
    borderRadius: "50%",
  },
  "& .MuiStepIcon-root.Mui-active": {
    color: "#BFE2FD !important",
    transform: "scale(1.25)",
    border: "1px solid transparent",
  },
  "& .MuiStepIcon-root.Mui-completed": {
    color: "#02295A !important",
    transform: "scale(1.25)",
    border: "1px solid transparent",
    borderRadius: "50%",
  },
  "& .MuiStepIcon-text": {
    fill: "#02295A",
    fontFamily: "Ubuntu Bold",
  },
});