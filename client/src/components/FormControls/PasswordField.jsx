import classNames from 'classnames';
import { bool, string } from 'prop-types';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

PasswordField.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    disable: bool
};
PasswordField.defaultProps = {
    disable: false
};

function PasswordField(props) {
    const { label, name, disable } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors }
    } = form;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword((x) => !x);
    };
    return (
        <View className={classNames({ 'mb-2': !errors[name] })}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        label={label}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        disabled={disable}
                        error={!!errors[name]}
                        secureTextEntry={!showPassword}
                        right={<TextInput.Icon icon={!showPassword ? 'eye-off' : 'eye'} onPress={handleClickShowPassword} size={20} />}
                    />
                )}
                name={name}
            />
            {!!errors[name] && <HelperText type="error">{String(errors[name]?.message || '')}</HelperText>}
        </View>
    );
}

export default PasswordField;
