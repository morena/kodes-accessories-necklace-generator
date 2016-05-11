define([], function(){

	compose = function(Base, proto){

		var Constructor = function(){
			if(typeof this.initialise === 'function'){
				this.initialise.apply(this, arguments);
			}
		};

		if(arguments.length < 2){
			Constructor.prototype = Base;
		}
		else{
			Constructor.prototype = Object.create(Base.prototype);
			Constructor.prototype.constructor = Constructor;

			for(var key in proto){
				Constructor.prototype[key] = proto[key];
			}
		}

		return Constructor;
	}

	return compose;
});
