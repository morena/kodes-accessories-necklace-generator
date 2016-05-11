'use strict';

define(["jquery",
		"compose"],
	function($,
		compose){

	var ChooseColours = compose( {

		$divToPopulate: null,
    $currentBead = null,
    areWeEditing = false,

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
        var $bead = null,
            id = null;

        //check if we are editing
        if(areWeEditing === true){
          //save bead ID in memory
          self.$currentBead = $bead;
        }else{
          $bead = $(this),
          //save bead ID in memory
          self.$currentBead = $bead;
        }
        id = $bead.attr("id");

        //also record that we are editing hence won't be expecting another click on same bead unless it's to change bead
        self.areWeEditing = true;

        console.log(id);

        //assignAColour
        self.pickColour($bead);

      });
    }
	});

  pickColour:function($bead){
    //record colour click
    $("#colours li").click(function(){
      var bgColour = $(this).attr("class");
      $bead.css('fill', bgColour);

      //pass the value of the colour chosen to the bead
      $("#necklaceORderForm #bead" + id).val(bgColour);

    });
  }

	return ChooseColours;
});
