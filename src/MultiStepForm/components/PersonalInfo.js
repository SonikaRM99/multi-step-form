import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "../../App.css";
import Schema from "./schema.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage } from "react-intl";
function PersonalInfo({ activeStep, setActiveStep, isMobile }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("basicInfo", JSON.stringify(data));
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <Box mt={7.5}>
        <StyledHeading>
          <FormattedMessage id="PERSONAL_INFO" />
        </StyledHeading>
        <StyledTypo>
          <FormattedMessage id="PERSONAL_INFO_TEXT" />
        </StyledTypo>
      </Box>
      <Box>
        <Grid
          item
          display="flex"
          flexDirection="column"
          mt={2}
          xs={12}
          sm={12}
          md={8}
          style={{ textAlign: "left" }}
        >
          <StyledLabel>Name</StyledLabel>
          <StyledTextField
            required
            placeholder="e.g. Stephen King"
            name="fullname"
            {...register("fullname")}
            control={control}
            error={errors.fullname ? true : false}
            helperText={errors?.fullname?.message}
          />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          mt={2}
          xs={12}
          sm={12}
          md={8}
          style={{ textAlign: "left" }}
        >
          <StyledLabel>Email</StyledLabel>
          <StyledTextField
            required
            placeholder="e.g. stephenking@lorem.com"
            name="email"
            {...register("email")}
            control={control}
            error={errors.email ? true : false}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          mt={2}
          xs={12}
          sm={12}
          md={8}
          style={{ textAlign: "left" }}
        >
          <StyledLabel>Mobile Number</StyledLabel>
          <StyledTextField
            required
            name="phoneNumber"
            {...register("phoneNumber")}
            control={control}
            error={errors.phoneNumber ? true : false}
            helperText={errors?.phoneNumber?.message}
            placeholder="e.g. +1 234 567 890"
          />
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="flex-end"
          mt={5}
          xs={12}
          sm={12}
          md={8}
        >
          <StyledButton
            onClick={handleSubmit(onSubmit)}
            px={1.25}
            py={3.75}
          >
            Next Step
          </StyledButton>
        </Grid>
      </Box>
      <Box></Box>
    </>
  );
}

export default PersonalInfo;

const StyledHeading = styled(Typography)({
  color: "#02295A",
  fontFamily: "Ubuntu Bold",
  fontSize: "30px",
  textAlign: "left",
});
const StyledTypo = styled(Typography)({
  color: "hsl(231, 11%, 63%)",
  fontFamily: "Ubuntu Medium",
  fontSize: "18px",
  textAlign: "left",
});
const StyledLabel = styled(Typography)({
  color: "#02295A",
  fontFamily: "Ubuntu Medium",
  fontSize: "16px",
  paddingBottom: "8px",
});

const StyledTextField = styled(TextField)({
  fontFamily: "Ubuntu Regular",
  fontSize: "16px",
});

const StyledButton = styled(Button)({
  color: "hsl(0, 0%, 100%)",
  background: "#02295A",
  fontFamily: "Ubuntu Regular",
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
    background: "hsl(0, 0%, 100%)",
    color: "#02295A",
    border: "1px solid hsl(231, 11%, 63%)",
  },
});
