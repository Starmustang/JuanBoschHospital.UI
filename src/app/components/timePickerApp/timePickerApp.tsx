import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import dayjs, { Dayjs } from 'dayjs';

interface TimePickerAppProps {
    name: string;
    control: any;
    label: string;
    disabled?: boolean;
}

const TimePickerApp: React.FC<TimePickerAppProps> = ({ name, control, label, disabled = false }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <CustomFormLabel htmlFor={name} color={!!error ? 'error' : 'default'}>
                            {label}
                        </CustomFormLabel>
                        <TimePicker
                            value={field.value ? dayjs(field.value, 'HH:mm:ss') : null}
                            onChange={(newValue: Dayjs | null) => {
                                field.onChange(newValue ? newValue.format('HH:mm:ss') : null);
                            }}
                            disabled={disabled}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: 'small',
                                    error: !!error,
                                    helperText: error?.message,
                                },
                            }}
                        />
                    </>
                )}
            />
        </LocalizationProvider>
    );
};

export default TimePickerApp;
