import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface ControlledCheckboxProps {
  control: any;
  name: string;
  label: string;
}

const CheckBoxApp = ({ control, name, label }: ControlledCheckboxProps) => {
  return (
    <>
      {/* <CustomFormLabel htmlFor={name}>{label}</CustomFormLabel> */}
      {/* 
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            name="checkednormal"
          />
        }
        label={label}
      /> */}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
              />
              //   <Checkbox
              //     color="primary"

              //     name="checkednormal"
              //   />
            }
            label={label}
          />
        )}
      />
    </>
  );
};

export default CheckBoxApp;
