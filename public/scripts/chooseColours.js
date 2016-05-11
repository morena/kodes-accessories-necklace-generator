'use strict';

define(["jquery",
		"compose"],
	function($,
		compose){

	var ChooseColours = compose( {

		$divToPopulate: null,
    $form: null,

		initialise: function($el){
			this.$el = $el;
			this.postRender();
		},

		postRender: function(){
      this.setupForm();
      this.respondToClick();
		},

    setupForm:function(){
      var $form = $("#necklaceORderForm"),
          $input = '',
          beads = [],
          id = 0;

      $("#beads path").each(function(){
        id = $(this).attr("id");
        if(typeof id != 'undefined'){
          beads.push($(this).attr("id"));
        }
      });
      console.log(beads.length);

      for(var i = 0; i < beads.length; i++){
        console.log(beads[i]);
        $input = '<input type="hidden" value="" id="bead'+beads[i]+'" />';
        $form.append($($input));
      }
    },

    respondToClick: function(){
      var self = this;
      $("#beads path").click(function(){
        var $bead = $(this),
            id = $bead.attr("id");
        console.log(id);

        //record colour click
        $("#colours li").click(function(){
          var bgColour = $(this).attr("class");
          $bead.css('fill', bgColour);

          //pass the value of the colour chosen to the bead
          $("#necklaceORderForm #bead" + id).val(bgColour);

        });
      });
    }
	});

	return ChooseColours;
});
