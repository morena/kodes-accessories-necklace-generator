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
        if(typeof id != 'undefined' && id != "cord_1_"){
          console.log(id);
          beads.push($(this).attr("id"));
        }
      });
      //console.log(beads.length);

      for(var i = 0; i < beads.length; i++){
        //console.log(beads[i]);
        $input = '<input type="hidden" class="order" value="0" id="bead'+beads[i]+'" />';
        $form.append($($input));
      }

      $("confirmOrder").prop('disabled', true);
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
          console.log(self.$currentBead);
        });*/

        //form validation
        //disabled for test purposes
        /*$("confirmOrder").click(function(e){
          var valid = true;
          e.preventDefault();

          $(".order").each(function(){
            var value = $(this).val();
            if(value == '0' ){
              valid = false;
            }
          });

          if(valid === false){
            alert("You have not personalised all the beads.");
          }else{
            $("#necklaceORderForm")[0].submit();
          }
        });*/
      });
    },

    pickColour: function(bgColour){
      var $bead = this.$currentBead,
          id = $bead.attr("id");
      //console.log(id);
      $('#' + id + ' > g[id^="b"] path').css('fill', bgColour); //only one side of the bead for now

      //pass the value of the colour chosen to the bead
      $("#necklaceORderForm #bead" + id).val(bgColour);

      $("confirmOrder").prop('disabled', false);

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
