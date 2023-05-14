import {
  Box,
  ThemeProvider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import * as React from "react";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
const AdoptProcess = () => {
  // return (
  //   <Box display={"flex"} justifyContent={"center"} pt={5} pb={20}>
  //     <img
  //       alt="AdoptProcess"
  //       src="/images/About/adoptprocess.png"
  //       width={"100%"}
  //     />
  //   </Box>
  // );
  // };
  const steps = [
    {
      label: "유기동물 정보 확인",
      description: `보호소에 있는 유기동물들의 정보를 확인합니다.`,
      img: (
        <img
          src="/images/About/adoptProcess1.png"
          alt="random"
          width="1000"
          height="200"
        />
      ),
    },
    {
      label: "입양 자격 확인",
      description: "입양체크리스트를 통해 입양 자격을 확인합니다.",
      img: (
        <img
          src="/images/About/adoptProcess2.png"
          alt="random"
          width="1000"
          height="200"
        />
      ),
    },
    {
      label: "입양 신청",
      description: `입양 신청 양식을 작성합니다.`,
      img: (
        <img
          src="/images/About/adoptProcess3.png"
          alt="random"
          width="1000"
          height="250"
        />
      ),
    },
    {
      label: "서류 전달",
      description: `보호소에 입양 서류를 전달합니다.`,
      img: (
        <img
          src="/images/About/adoptProcess4.png"
          alt="random"
          width="1000"
          height="350"
        />
      ),
    },
    {
      label: "보호소 매칭",
      description: `서류 심사 후 승인을 받은 사용자는 해당 보호소와 매칭됩니다.`,
      img: (
        <img
          src="/images/About/adoptProcess5.png"
          alt="random"
          width="1000"
          height="250"
        />
      ),
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ThemeProvider theme={CustomTheme}>
        <Container sx={{ width: "70vw", mt: 5, mb: 5 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "GmarketSansMedium",
                    }}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontFamily: "GmarketSansMedium",
                    }}
                  >
                    {step.description}
                  </Typography>
                  {step.img}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "끝내기" : "다음 단계"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        이전 단계
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={5} sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "GmarketSansMedium",
                }}
              >
                모든 절차를 확인하셨습니다. 감사합니다 :)
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                처음으로
              </Button>
            </Paper>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AdoptProcess;
