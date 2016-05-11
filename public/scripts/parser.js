define(['jquery', 'registry'], function($, registry){

	return {
		parse: function(callback){
			var collection = $("[data-module]"),
				count = 0,
				total = collection.length;

			collection.each(function(){

				var module = $(this).attr('data-module'),
					$el = $(this);

				if(module){
					var params = $el.attr('data-module-params');

					var fnc = new Function('return {' + params + '}');

					require([module], function(Module){
						var module = new Module($el, fnc);
						registry.register($el, module);
						count++;

						if(count === total){
							callback();
						}

					});

				}

			});
		}
	};
});
