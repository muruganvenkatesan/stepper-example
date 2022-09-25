import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import { Button, Stack, Box, Step, StepLabel, Stepper } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses
} from "@mui/material/StepConnector";
import TextBox from "./TextBox";
import MediaControlCard from "./Card";
import Radio from "./Radio";
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
    borderColor: "gray"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "gray"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "gray"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4"
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  },
  "& .QontoStepIcon-circle": {
    width: 13,
    height: 13,
    borderRadius: "50%",
    border: "1px solid #867979",
    backgroundColor: "#FFFFFF"
  },
  "& .active": {
    padding: "0.25rem",
    borderRadius: "50%",
    border: "2px solid blue",
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckCircleRoundedIcon style={{ color: "green" }} />
      ) : active ? (
        <div className="active">
          <div className="QontoStepIcon-circle"></div>
        </div>
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
};

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const steps = ["1", "2", "3", "4"];
const labels = [
  "Incident Information",
  "Service options",
  "Service fullfilment",
  "Summary"
];
export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Box px="1rem" mt="1rem">
        <Box mb="1rem">{labels[activeStep]}</Box>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label} onClick={() => setActiveStep(index)}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {index === 0 ? `Step ${index + 1} of 4` : ""}
                {index === 3 ? `Next: ${labels[activeStep + 1]}` : ""}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? (
          <StepOneComponent />
        ) : activeStep === 1 ? (
          <StepTwoComponent />
        ) : activeStep === 2 ? (
          <StepThreeComponent />
        ) : null}

        <Stack mt="1rem" direction="row" justifyContent="space-between">
          <Button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            disabled={activeStep === 0 ? true : false}
            color="primary"
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setActiveStep(activeStep + 1);
            }}
            disabled={activeStep === 3 ? true : false}
            variant="contained"
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

const StepOneComponent = () => {
  return (
    <>
      <h3>Please tell us what happend</h3>
      <Box mb="1rem">
        <TextBox
          label="Date of incident"
          type="date"
          placeholder="Enter the date"
        />
      </Box>
      <Box mb="1rem">
        <TextBox
          minRows={3}
          value="The screen is not working"
          multiline={true}
          label="Describe the issue"
          type="text"
        />
      </Box>
    </>
  );
};
const StepTwoComponent = () => {
  return (
    <>
      <h3>Select how you would like your product to be serviced</h3>
      <Stack mt="1rem" direction="row">
        <MediaControlCard />
        <MediaControlCard />
      </Stack>
    </>
  );
};
const StepThreeComponent = () => {
  return (
    <>
      <h3>Mail in repair</h3>
      <p>
        Once yorr device is repaired it will bw shipped to the are a widespread
        group of squamate reptiles, with over 6,000{" "}
      </p>
      <Radio />
      <div mt="1rem">
        <h3>Steve smith</h3>
        <span>123 Man street</span>
        <br />
        <span>Atlanta, 30031</span>
        <br />
        <span>United states</span>
        <br />
        <span>Atlanta, 30031</span>
        <br />
        <span>stevesmith@email.com</span>
        <br />
      </div>
    </>
  );
};
