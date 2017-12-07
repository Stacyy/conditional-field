class ConditionalField {
  constructor(args){
    this.$control = $(args.control);

    if(this.$control.length == 0) return;

    this.args = args;
    this.inputType = this.getInputType();
    this.setVisible(this.inputValue());

    this.onChangeBound = this.onChange.bind(this);
    this.$control.on('change', this.onChangeBound);
  }

  onChange(e) {
    var value = this.inputValue();
    this.setVisible(value);
  }

  setVisible(value) {

    var controlValues = Object.values(this.args.visibility),
        controlKeys = Object.keys(this.args.visibility),
        propertyEqualByValue = [],
        valueInVisibility,
        valueNotInVisibility;

    if (Array.isArray(value)) {
      valueInVisibility = controlKeys.filter(
          function (item) {
            return value.indexOf(item) != -1;
          });

      valueNotInVisibility = controlKeys.filter(
          function (item) {
            return value.indexOf(item) == -1;
          });
    } else {
      valueInVisibility = controlKeys.filter(
          function (item) {
            return item == value;
          });

      valueNotInVisibility = controlKeys.filter(
          function (item) {
            return item != value;
          });
    }

    for (var i = 0; i < valueInVisibility.length; i++) {
      for (var j = 0; j < controlValues.length; j++) {
        if (this.args.visibility[valueInVisibility[i]] == controlValues[j]) {
          propertyEqualByValue.push(controlKeys[j]);
        }
      }
    }

    valueNotInVisibility = valueNotInVisibility.filter(
        function (item) {
          return propertyEqualByValue.indexOf(item) == -1;
        });

    for (var i = 0; i < valueInVisibility.length; i++) {
      $(this.args.visibility[valueInVisibility[i]]).show();
    }

    for (var j = 0; j < valueNotInVisibility.length; j++) {
      $(this.args.visibility[valueNotInVisibility[j]]).hide();
    }
  }

  getInputType() {
    if(this.$control.is('select')){
      return 'select';
    }else if(this.$control.is(':radio')){
      return 'radio';
    }else if(this.$control.is(':checkbox')){
      return 'checkbox';
    }
  }

  inputValue() {
    let value = '';
    switch(this.inputType){
      case 'checkbox':
        value = this.$control.is(':checked') ? 'on' : 'off';
        break;
      case 'radio':
        value = this.$control.filter(':checked').val();
        break;
      default:
        value = this.$control.val();
    }
    return value;
  }

  destroy() {
    this.$control.off('change', this.onChangeBound);
  }
}