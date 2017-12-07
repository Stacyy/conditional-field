describe('ConditionalField', function() {
  describe('#constructor', function(){
    it('shows only visible elements on page load', function() {
      new ConditionalField({
        control: '.test-select select',
        visibility: {
          'mothers': '.test-select .zappa',
          'spiders': '.test-select .bowie'
        }
      });

      expect($('.test-select .zappa').is(':visible')).to.equal(true)
      expect($('.test-select .bowie').is(':visible')).to.equal(false)
    });

    describe('when control selector contains no results', function(){
      it('returns silently', function(){
        var cf = new ConditionalField({
          control: '.does-not-exist',
          visibility: {
            'mothers': '.test-select .zappa',
            'spiders': '.test-select .bowie'
          }
        });

        expect(cf.args).to.equal(undefined);
      });
    });
  });

  describe('#getInputType', function(){
    describe('when control is a `select` element', function(){
      it('returns "select"', function(){
        var cf = new ConditionalField({
          control: '.test-select select',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('select');
      });
    });

    describe('when control is a `radio` input', function(){
      it('returns "radio"', function(){
        var cf = new ConditionalField({
          control: '.test-radio [type="radio"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('radio');
      });
    });

    describe('when control is a `checkbox` input', function(){
      it('returns "checkbox"', function(){
        var cf = new ConditionalField({
          control: '.test-checkbox [type="checkbox"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('checkbox');
      });
    });
  });

  describe('#destroy', function(){
    it('removes the `change` event handler', function(){
      var cf = new ConditionalField({
        control: '.test-destroy select',
        visibility: {
          'mothers': '.test-destroy .zappa',
          'spiders': '.test-destroy .bowie'
        }
      });

      expect($('.test-destroy .zappa').is(':visible')).to.equal(true);
      expect($('.test-destroy .bowie').is(':visible')).to.equal(false);

      cf.destroy();

      $('.test-destroy select').val('spiders').trigger('change');

      expect($('.test-destroy .zappa').is(':visible')).to.equal(true);
      expect($('.test-destroy .bowie').is(':visible')).to.equal(false);
    });
  });

  describe('when the control changes value', function(){
    describe('and the control is a `select` element', function(){
      it('shows only visible elements declared in visibility', function(){
        new ConditionalField({
          control: '.test-select select',
          visibility: {
            'mothers': '.test-select .zappa',
            'spiders': '.test-select .bowie'
          }
        });

        $('.test-select select').val('spiders').trigger('change');

        expect($('.test-select .zappa').is(':visible')).to.equal(false)
        expect($('.test-select .bowie').is(':visible')).to.equal(true)
      });
    });

    describe('and the control is a `radio` element', function(){
      it('shows only visible elements declared in visibility', function(){
        new ConditionalField({
          control: '.test-radio [name="artists"]',
          visibility: {
            'mothers': '.test-radio .zappa',
            'spiders': '.test-radio .bowie'
          }
        });

        $('.test-radio [value="spiders"]').prop('checked', true).trigger('change');

        expect($('.test-radio .zappa').is(':visible')).to.equal(false)
        expect($('.test-radio .bowie').is(':visible')).to.equal(true)
      });
    });

    describe('and the control is a `checkbox` element', function(){
      it('shows the `on` value when checked, and the `off` value when unchecked', function(){
        new ConditionalField({
          control: '.test-checkbox input[type="checkbox"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        $('.test-checkbox [type="checkbox"]').prop('checked', true).trigger('change');

        expect($('.test-checkbox .zappa').is(':visible')).to.equal(false);
        expect($('.test-checkbox .bowie').is(':visible')).to.equal(true);

        $('.test-checkbox [type="checkbox"]').prop('checked', false).trigger('change');

        expect($('.test-checkbox .zappa').is(':visible')).to.equal(true)
        expect($('.test-checkbox .bowie').is(':visible')).to.equal(false)
      });
    });

		describe('and the control is a `select` element with multiple attribute', function(){
			it('shows only visible elements declared in visibility', function() {
				new ConditionalField({
					control: '.test-multiple-select select',
					visibility: {
						'test1': '.test-multiple-select .zappa',
						'test3': '.test-multiple-select .bowie'
					}
				});

				$('.test-multiple-select select').val('test1').trigger('change');

				expect($('.test-multiple-select .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-select .bowie').is(':visible')).to.equal(false);

				$('.test-multiple-select select').val(['test1', 'test2']).trigger('change');

				expect($('.test-multiple-select .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-select .bowie').is(':visible')).to.equal(false);

				$('.test-multiple-select select').val(['test1', 'test2', 'test3', 'test4']).trigger('change');

				expect($('.test-multiple-select .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-select .bowie').is(':visible')).to.equal(true);

				$('.test-multiple-select select').val(['test2', 'test3', 'test4']).trigger('change');

				expect($('.test-multiple-select .zappa').is(':visible')).to.equal(false);
				expect($('.test-multiple-select .bowie').is(':visible')).to.equal(true);
			});
		});

		describe('and the control is a `input` element with multiple keys for visibility', function(){
			it('shows only visible elements declared in visibility', function() {
				new ConditionalField({
					control: '.test-multiple-keys input',
					visibility: {
						'test1': '.test-multiple-keys .zappa',
						'test2': '.test-multiple-keys .bowie',
						'test3': '.test-multiple-keys .zappa'
					}
				});

				$('.test-multiple-keys input').val('test1').trigger('change');

				expect($('.test-multiple-keys .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys .bowie').is(':visible')).to.equal(false);

				$('.test-multiple-keys input').val('test2').trigger('change');

				expect($('.test-multiple-keys .zappa').is(':visible')).to.equal(false);
				expect($('.test-multiple-keys .bowie').is(':visible')).to.equal(true);

				$('.test-multiple-keys input').val('test3').trigger('change');

				expect($('.test-multiple-keys .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys .bowie').is(':visible')).to.equal(false);

			});
		});

		describe('and the control is a `select` element with multiple attribute and multiple keys to one element', function(){
			it('shows only visible elements declared in visibility', function() {
				new ConditionalField({
					control: '.test-multiple-keys-in-the-multiple-field select',
					visibility: {
						'test1': '.test-multiple-keys-in-the-multiple-field .zappa',
						'test2': '.test-multiple-keys-in-the-multiple-field .bowie',
						'test3': '.test-multiple-keys-in-the-multiple-field .zappa',
						'test4': '.test-multiple-keys-in-the-multiple-field .bowie'
					}
				});

				$('.test-multiple-keys-in-the-multiple-field select').val('test1').trigger('change');

				expect($('.test-multiple-keys-in-the-multiple-field .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys-in-the-multiple-field .bowie').is(':visible')).to.equal(false);

				$('.test-multiple-keys-in-the-multiple-field select').val(['test1', 'test2']).trigger('change');

				expect($('.test-multiple-keys-in-the-multiple-field .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys-in-the-multiple-field .bowie').is(':visible')).to.equal(true);

				$('.test-multiple-keys-in-the-multiple-field select').val(['test1', 'test2', 'test3', 'test4']).trigger('change');

				expect($('.test-multiple-keys-in-the-multiple-field .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys-in-the-multiple-field .bowie').is(':visible')).to.equal(true);

				$('.test-multiple-keys-in-the-multiple-field select').val(['test2', 'test4']).trigger('change');

				expect($('.test-multiple-keys-in-the-multiple-field .zappa').is(':visible')).to.equal(false);
				expect($('.test-multiple-keys-in-the-multiple-field .bowie').is(':visible')).to.equal(true);

				$('.test-multiple-keys-in-the-multiple-field select').val(['test1', 'test3']).trigger('change');

				expect($('.test-multiple-keys-in-the-multiple-field .zappa').is(':visible')).to.equal(true);
				expect($('.test-multiple-keys-in-the-multiple-field .bowie').is(':visible')).to.equal(false);
			});
		});

  });
});