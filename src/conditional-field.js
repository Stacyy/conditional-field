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
    for (var controlValue in this.args.visibility) {
      if(Array.isArray(value)){
        for(var i = 0; i < value.length; i++){
          if (value[i] == controlValue) {
            $(this.args.visibility[controlValue]).show();
            break;
          }else{
            $(this.args.visibility[controlValue]).hide();
          }
        }
      }else{
        if (value == controlValue) {
          $(this.args.visibility[controlValue]).show();
        }else{
          $(this.args.visibility[controlValue]).hide();
        }
      }
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