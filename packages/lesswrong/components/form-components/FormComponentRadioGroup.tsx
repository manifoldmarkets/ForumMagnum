import React, { Component } from 'react';
import { registerComponent, Components } from '../../lib/vulcan-lib';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import { commentMutationOptions } from '../../lib/collections/comments';
import { eventFormat } from '../walledGarden/PortalBarGcalEventItem';

const styles = theme => ({
  radio: {
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 0
  }
})

const FormComponentRadioGroup = ({ path, value, form, options, name, label, classes, position }, context) => {
  const selectOptions = options || (form && form.options)
  return <FormControl>
    <FormLabel>{label}</FormLabel>
    <RadioGroup aria-label={name} name={name} value={value}
      onChange={(event) => {
        context.updateCurrentValues({
          [path]: (event?.target as any)?.value
        })
    }}>
      {selectOptions.map(option => {
        return (
          <FormControlLabel 
            key={`${name}-${option.value}`} 
            value={option.value} 
            label={option.label}
            control={<Radio className={classes.radio} />
            }/>
        )
      })}
    </RadioGroup>
  </FormControl>
}

(FormComponentRadioGroup as any).contextTypes = {
  updateCurrentValues: PropTypes.func,
};

const FormComponentRadioGroupComponent = registerComponent("FormComponentRadioGroup", FormComponentRadioGroup, {styles});

declare global {
  interface ComponentTypes {
    FormComponentRadioGroup: typeof FormComponentRadioGroupComponent
  }
}
