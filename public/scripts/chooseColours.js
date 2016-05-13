'use strict';

define(["jquery",
				"compose",
				"./lib/bootstrap.min"],
	function($,
		compose){

	var ChooseColours = compose( {

		$divToPopulate: null,
    $form: null,
    $currentBeadId: null,
		beadsToEdit: [],

		initialise: function($el){
			this.$el = $el;
			this.postRender();
		},

		postRender: function(){
      this.setupForm();
      this.respondToClick();
		},

    setupForm:function(){
      var $form = $("#necklaceOrderForm"),
          $input = '',
          beads = [],
          id = 0;

      $("#beads > g").each(function(){
        id = $(this).attr("id");
        if(typeof id != 'undefined' && id != "cord_1_"){
          //console.log(id);
          beads.push($(this).attr("id"));
        }
      });
      //console.log(beads.length);

      for(var i = 0; i < beads.length; i++){
        //console.log(beads[i]);
        $input = '<input type="hidden" class="order" value="0" id="'+beads[i]+'" name="'+beads[i]+'" />';
        $form.append($($input));
      }

      $("#confirmOrder").prop('disabled', true);
    },

    respondToClick: function(){
      var self = this;
      $("#beads > g").click(function(){
        var $bead = $(this);
				$($bead).css('border', '2px solid black;'); //this is not possible on this SVG item
        //save bead ID in memory
				self.beadsToEdit.push($bead.attr("id"));
        //self.$currentBeadId = $bead.attr("id");
        //console.log(self.$currentBeadId);

        //respond on click on colour
        $("#colours li button").click(function(){
          var bgColour = $(this).data("hex"),
              colourName = $(this).data("colour");
					console.log(bgColour);
					console.log(colourName);
					//self.openModal(bgColour, colourName);
					self.pickColour(bgColour, colourName);
        });

        /*//respond to click on cord
        $("#beads #cord_1").click(function(){
          var $bead = $(this);
          //save bead ID in memory
          self.$currentBeadId = $bead.attr("id");
          console.log(self.$currentBeadId);
        });*/

        //form validation
        //disabled for test purposes
        $("#confirmOrder").click(function(e){
          var valid = true;
          e.preventDefault();

          $(".order").each(function(){
            var beadValue = $(this).val();
            if(beadValue == '0' ){
              valid = false;
            }
          });

          if(valid === false){
            alert("You have not personalised all the beads.");
          }else{
            $("#necklaceOrderForm")[0].submit();
          }
        });


      });
    },

    pickColour: function(bgColour, colourName){
			var self = this;
			for( var i = 0; i <= self.beadsToEdit.length; i++){
				var id = self.beadsToEdit[i];
				/*if(beadPartToPaint == 'half'){
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					colourName = colourName + ' half';
				}else{
	      	$('#' + id + ' g[id^="a"] path').css('fill', bgColour);
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					colourName = colourName + ' full';
				}*/
				$('#' + id + ' g[id^="b"] path').css('fill', bgColour);

	      //pass the value of the colour chosen to the bead
	      $("#necklaceOrderForm #" + id).val(colourName);
			}

			//delete beads to colour from memory //this is not very wise but otherwise I don't know what to :S
			self.beadsToEdit = [];

      $("#confirmOrder").prop('disabled', false);

    },

    /*pickColourForCord: function(bgColour){
      var $id = this.$currentBeadId;
      //console.log(id);
      //console.log($("#" + id + "b"));
      $("#" + id + "b path").css('fill', bgColour); //only one side of the bead for now

      //pass the value of the colour chosen to the bead
      $("#necklaceOrderForm " + id).val(bgColour);
    }*/

		openModal: function(){
			var self = $(this);
			console.log("here");
			$('#beadPartModal').modal();

			$(".beadPartInput").click(function(){
				var val = $(this).val();
				console.log(val);
			});

			/*$('#beadPartModal').on('hidden.bs.modal', function (e) {
				$(self.$currentBeadId).data('beadPart', val);
				self.pickColour(bgColour, colourName, val);
			});*/


		}
	});

	return ChooseColours;
});
