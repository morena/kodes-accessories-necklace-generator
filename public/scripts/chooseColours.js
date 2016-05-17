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
		bgColour : null,

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
          beads.push($(this).attr("id"));
        }
      });

      for(var i = 0; i < beads.length; i++){
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
				console.log("Added bead " + $bead.attr("id") + " to beads to paint");
      });

			//respond on click on colour
			$("#colours li button").click(function(){
				if( self.beadsToEdit.length > 0){

					var bgColour = $(this).data("hex"),
							colourName = $(this).data("colour"),
							id = $(this).attr("id");
					self.bgColour = bgColour;
					self.openModal(colourName);
					//self.pickColour(bgColour, colourName);
				}else{
					alert("You have not picked any beads to colour yet.");
				}
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

    },

    pickColour: function(colourName, beadPartToPaint){
			var self = this,
					bgColour = self.bgColour;
					console.log("painting beads " + bgcolour + " " + colourName + " " + beadPartToPaint);
			for( var i = 0; i <= self.beadsToEdit.length; i++){
				var id = self.beadsToEdit[i];
				if(beadPartToPaint == 'half'){
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					colourName = colourName + ' half';
				}else{
	      	$('#' + id + ' g[id^="a"] path').css('fill', bgColour);
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					colourName = colourName + ' full';
				}
	      //pass the value of the colour chosen to the bead
	      $("#necklaceOrderForm #" + id).val(colourName);
			}

			//delete beads to colour from memory //this is not very wise but otherwise I don't know what to :S
			self.beadsToEdit = [];
			self.bgColour = null;
			console.log("we have fnished painting the beads." + self.beadsToEdit );

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

		openModal: function(colourName){
			var self = this,
					val = null,
					bgColour = self.bgColour;
			$('#beadPartModal').modal();

			$(".beadPartInput").click(function(){
				val = $(this).val();
			});

			$('#beadPartModal').on('hidden.bs.modal', function (e) {
				$(self.$currentBeadId).data('beadPart', val);
				self.pickColour(colourName, val);
			});

		}
	});

	return ChooseColours;
});
