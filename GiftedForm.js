'use strict';

import React from 'react';


let GiftedFormManager = require('./GiftedFormManager');

let ContainerMixin = require('./mixins/ContainerMixin');
let WidgetMixin = require('./mixins/WidgetMixin');

let SelectWidget = require('./widgets/SelectWidget');
let OptionWidget = require('./widgets/OptionWidget');

// @todo disable a field

var GiftedForm = React.createClass({
  mixins: [ContainerMixin],

  statics: {
    SelectWidget: SelectWidget,
    OptionWidget: OptionWidget,
  },

  getDefaultProps() {
    return {
      isModal: false,
      clearOnClose: false,

      validators: {},
      defaults: {},
      openModal: null,
    }
  },

  propTypes: {
    isModal: React.PropTypes.bool,
    clearOnClose: React.PropTypes.bool,

    validators: React.PropTypes.object,
    defaults: React.PropTypes.object,
    openModal: React.PropTypes.func,
  },

  componentWillUnmount() {
    if (this.props.clearOnClose === true) {
      GiftedFormManager.reset(this.props.formName);
    }
  },

  componentWillMount() {
    // register validators
    for (var key in this.props.validators) {
      if (this.props.validators.hasOwnProperty(key)) {
        GiftedFormManager.setValidators(this.props.formName, key, this.props.validators[key]);
      }
    }

    // register defaults values
    for (var key in this.props.defaults) {
      if (this.props.defaults.hasOwnProperty(key)) {
        console.log('this.props.defaults[key]');
        console.log(this.props.defaults[key]);
        GiftedFormManager.updateValueIfNotSet(this.props.formName, key, this.props.defaults[key]);
      }
    }
  },

  render() {
    return this._renderContainerView();
  },
});

var GiftedFormModal = React.createClass({
  mixins: [ContainerMixin],

  getDefaultProps() {
    return {
      isModal: true,
    }
  },

  propTypes: {
    isModal: React.PropTypes.bool,
  },

  render() {
    return this._renderContainerView()
  },
});



module.exports = {
  GiftedForm, GiftedFormModal, GiftedFormManager,
  WidgetMixin,
};
