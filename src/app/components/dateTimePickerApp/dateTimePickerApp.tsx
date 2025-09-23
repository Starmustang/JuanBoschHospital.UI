import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import dayjs, { Dayjs } from 'dayjs';

interface DateTimePickerAppProps {
    name: string;
    control: any;
    label: string;
    disabled?: boolean;
}

const DateTimePickerApp: React.FC<DateTimePickerAppProps> = ({ name, control, label, disabled = false }) => {
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
                        <DateTimePicker
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue: Dayjs | null) => {
                                field.onChange(newValue ? newValue.toDate() : null);
                            }}
                            disabled={disabled}
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

export default DateTimePickerApp;
