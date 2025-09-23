import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { FormHelperText } from '@mui/material';

interface ControlledAutocompleteProps {
  name: string;
  control: any;
  label: string;
  options: { id: number | string | undefined; name: string }[];
  placeholder?: string;
  defaultValue?: number | number[];
  disabled?: boolean;
  multiple?: boolean;
  limitTags?: number;
  sx?: any;
  onChange?: (event: any, newValue: any) => void;
  onChangeCallback?: () => void;
  onKeyDown?: (event: any) => void;
  filteroptions?: (options: any, state: any) => any;
}

const AutocompleteApp: React.FC<ControlledAutocompleteProps> = ({
  name,
  control,
  label,
  options,
  placeholder = 'Seleccionar...',
  defaultValue = 0,
  disabled = false,
  multiple = false,
  limitTags = 2,
  sx = {},
  onChange = () => {},
  onKeyDown = () => {},
  onChangeCallback = () => {},
  filteroptions = () => {}
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            {label &&
              <CustomFormLabel htmlFor={name} color={!!error ? 'error' : 'default'}>
                {label}
              </CustomFormLabel>
            }
            <Autocomplete
              sx={sx}
              id={name}
              size='small'
              multiple={multiple}
              limitTags={multiple ? limitTags : undefined}
              options={options || []}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              value={multiple
                ? (Array.isArray(field.value) && options && Array.isArray(options)
                  ? field.value.map(id => options.find(option => option.id === id) || null).filter(Boolean)
                  : [])
                : (options && Array.isArray(options)
                  ? options.find((option) => option.id === field.value) || null
                  : null)
              }
              onChange={(_, newValue) => {
                if (multiple) {
                  // For multiple selection, extract array of IDs
                  const ids = Array.isArray(newValue)
                    ? newValue.map(item => (item as any)?.id || 0)
                    : [];
                  field.onChange(ids);
                  if (onChangeCallback) onChangeCallback();
                } else {
                  // For single selection, extract single ID
                  const singleValue = newValue as { id: number | string; name: string } | null;
                  field.onChange(singleValue?.id || 0);
                  if (onChangeCallback) onChangeCallback();
                }
              }}
              disabled={disabled}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  placeholder={placeholder}
                  error={!!error}
                  onKeyDown={onKeyDown}
                  filteroptions={filteroptions}
              />
              )}
            />
            {error && (
              <FormHelperText error>{error.message}</FormHelperText>
            )}
          </>
        )}
      />
    </>
  );
};

export default AutocompleteApp;
