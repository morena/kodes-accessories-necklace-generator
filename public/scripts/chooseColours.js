'use strict';

define(["jquery",
				"compose",
				"domtoimage",
				"fileSaver",
				"./lib/bootstrap.min"],
	function($,
		compose){

	var ChooseColours = compose( {

		$divToPopulate: null,
    $form: null,
		beadsToEdit: [],
		bgColour : null,
		colourName: null,

		initialise: function($el){
			this.$el = $el;
			this.postRender();
		},

		postRender: function(){
      this.setupForm();
			this.colourNecklace();
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

		getRandomColour: function(){
			var colours = [];

			$("#colours li button").each(function(){
				var bgColour = $(this).data("hex");
				colours.push(bgColour);
			});

			var random = Math.ceil( Math.random() * (colours.length - 1) + 1 );

			return colours[random];
		},

		colourNecklace: function(){
			var $beads = [],
					self = this,
					randomColour1 = self.getRandomColour(),
					randomColour2 = self.getRandomColour();
			if(randomColour1 === randomColour2){
				randomColour2 = self.getRandomColour();
			}
			$beads = $('#beads g[id^="_x"]');

			for( var i = 0; i <= $beads.length-1; i++){
				var id = $($beads[i]).attr("id");
				if( i === 0 || i === 4){
					$('#' + id + ' g[id^="b"] path').css('fill', "#FFECB8");
					$('#' + id + ' g[id^="a"] path').css('fill', randomColour1);
				}else if(i === 1 || i === 3){
					$('#' + id + ' g[id^="a"] path').css("fill", "#FFECB8");
					$('#' + id + ' g[id^="b"] path').css("fill", randomColour2);
				}else{
					$('#' + id + ' g[id^="b"] path').css("fill", randomColour1);
					$('#' + id + ' g[id^="a"] path').css("fill", randomColour1);
				}
			}
		},

    respondToClick: function(){
      var self = this;
      $("#beads > g").click(function(){
        var $bead = $(this);
				$($bead).css({'stroke': '#945595', 'stroke-width': '4px'});
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
					self.colourName = colourName;
					self.openModal();
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

			//download necklace at any point
			$("#downloadThisNecklace").click(function(e){
				e.preventDefault();
				domtoimage.toBlob(document.getElementById('test'))
				.then(function (blob) {
						window.saveAs(blob, 'kodes-geometric-necklace.png');
				});
			});

			//form validation
			//disabled for test purposes
			$("#confirmOrder, #orderThisNecklace").click(function(e){
				var valid = true,
				$self = $(this);
				e.preventDefault();

				$(".order").each(function(){
					var beadValue = $(this).val();
					if(beadValue == '0'  && ( $self.attr("id") !== 'orderThisNecklace') ){
						valid = false;
					}
				});

				if(valid === false){
					alert("You have not personalised all the beads.");
				}else{

					var node = document.getElementById('test');
					domtoimage.toPng(node)
			    .then(function (dataUrl) {
			        var img = new Image();
			        img.src = dataUrl;
			        //document.body.appendChild(img);
							var $input = '<input type="hidden" class="image" value="'+img.src+'" id="image" name="image" />';
							$("#necklaceOrderForm").append($input);
							$("#necklaceOrderForm")[0].submit();
			    })
			    .catch(function (error) {
			        console.error('oops, something went wrong!', error);
			    });
					/*domtoimage.toBlob(document.getElementById('test'))
			    .then(function (blob) {
			        window.saveAs(blob, 'my-node.png');
			    });*/
				}
			});

    },

    pickColour: function(colourName, beadPartToPaint){
			var self = this,
					bgColour = self.bgColour,
					colourName = self.colourName;
					console.log("painting beads " + bgColour + " " + colourName + " " + beadPartToPaint);
			for( var i = 0; i <= self.beadsToEdit.length; i++){
				var id = self.beadsToEdit[i];
						$('#' + id + ' g[id^="a"] path').css("fill", "#FFECB8");
						$('#' + id + ' g[id^="b"] path').css("fill", "#FFECB8");
						$("#"+self.beadsToEdit[i]).css({'stroke': '#945595', "stroke-width": "0"});
				if(beadPartToPaint == 'half'){
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					if(i === 0){
						colourName = colourName + ' half';
					}
				}else{
	      	$('#' + id + ' g[id^="a"] path').css('fill', bgColour);
	      	$('#' + id + ' g[id^="b"] path').css('fill', bgColour);
					if(i === 0){
						colourName = colourName + ' full';
					}
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
					console.log("openModal " + bgColour);
			$('#beadPartModal').modal();

			$(".beadPartInput").click(function(){
				val = $(this).val();
			});

			$('#beadPartModal').on('hidden.bs.modal', function (e) {
				for( var i = 0; i <= self.beadsToEdit.length; i++){
					$(self.beadsToEdit[i]).data('beadPart', val);
				}
				self.pickColour(colourName, val);
			});

		}
	});

	return ChooseColours;
});
