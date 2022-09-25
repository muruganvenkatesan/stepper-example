import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="s"
          control={
            <Radio
              checked={a}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20
                }
              }}
            />
          }
          label="Same as policy"
        />
        <FormControlLabel
          value="male"
          control={
            <Radio
              checked={!a}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20
                }
              }}
            />
          }
          label="New Address"
        />
      </RadioGroup>
    </FormControl>
  );
}
