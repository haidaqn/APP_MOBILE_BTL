import classNames from 'classnames';
import { bool, string } from 'prop-types';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
TextField.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    disable: bool
};
TextField.defaultProps = {
    disable: false
};

export function TextField(props) {
    const { label, name, disable } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors }
    } = form;
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
                    />
                )}
                name={name}
            />
            {!!errors[name] && <HelperText type="error">{String(errors[name]?.message || '')}</HelperText>}
        </View>
    );
}
