'use strict';

define(["jquery",
		"compose"],
	function($,
		compose){

	var ChooseColours = compose( {

		$divToPopulate: null,
    $form: null,
    $currentBead: null,

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

      $("#beads > g").each(function(){
        id = $(this).attr("id");
        if(typeof id != 'undefined'){
          console.log(id);
          beads.push($(this).attr("id"));
        }
      });
      //console.log(beads.length);

      for(var i = 0; i < beads.length; i++){
        //console.log(beads[i]);
        $input = '<input type="hidden" value="" id="bead'+beads[i]+'" />';
        $form.append($($input));
      }
    },

    respondToClick: function(){
      var self = this;
      $("#beads > g").click(function(){
        var $bead = $(this);
        //save bead ID in memory
        self.$currentBead = $bead;
        //console.log(self.$currentBead);

        //respond on click on colour
        $("#colours li").click(function(){
          var bgColour = $(this).attr("class");
          self.pickColour(bgColour);
        });

        /*//respond to click on cord
        $("#beads #cord_1").click(function(){
          var $bead = $(this);
          //save bead ID in memory
          self.$currentBead = $bead;
          //console.log(self.$currentBead);
        });*/
      });
    },

    pickColour: function(bgColour){
      var $bead = this.$currentBead,
          id = $bead.attr("id");
      //console.log(id);
      console.log($("#" + id + "b"));
      $('#' + id + ' > g[id^="b"] path').css('fill', bgColour); //only one side of the bead for now

      //pass the value of the colour chosen to the bead
      $("#necklaceORderForm #bead" + id).val(bgColour);

    },
    pickColourForCord: function(bgColour){
      var $bead = this.$currentBead,
          id = $bead.attr("id");
      //console.log(id);
      console.log($("#" + id + "b"));
      $("#" + id + "b path").css('fill', bgColour); //only one side of the bead for now

      //pass the value of the colour chosen to the bead
      $("#necklaceORderForm #bead" + id).val(bgColour);

    }
	});

	return ChooseColours;
});
