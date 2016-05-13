'use strict';

define(["jquery",
		"compose"],
	function($,
		compose){

	var insertDetails = compose( {

		initialise: function($el){
			this.$el = $el;
			this.postRender();
		},

		postRender: function(){
      this.respondToClick();
		},

    respondToClick: function(){
      //form validation
      //disabled for test purposes
      $("#insertDetailsBtn").click(function(e){
        var valid = true;
        e.preventDefault();

				$(".form-control").each(function(){
					var fieldValue = $(this).val();
          if(fieldValue == null  || fieldValue.length === 0){
            valid = false;
          }
				});

				console.log($("#email").val());
				console.log($("#repeatEmail").val());
				console.log($("#email").val() !== $("#repeatEmail").val());

				if( $("#email").val() !== $("#repeatEmail").val() ){
					$("#email, #repeatEmail").closest(".form-group").addClass("has-error");
				}else{
					$("#email, #repeatEmail").closest(".form-group").removeClass("has-error");
				}

        if(valid === false){
          alert("You have not filled in all the required personal details fields.");
        }else{
          $("#detailsForm")[0].submit();
        }
      });
    }
	});

	return insertDetails;
});
