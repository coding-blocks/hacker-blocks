export function initialize( appInstance ) {
	var insideFrame = true

	try {
		insideFrame = window.self !== window.top
	} finally {
		appInstance.register("flag:embeded", insideFrame, {
			instantiate: false,
			singleton: true
		})
	 	appInstance.inject('route', 'embeded', "flag:embeded")
	 	appInstance.inject('controller', 'embeded', "flag:embeded");
	}
}

export default {
  name: 'embed',
  initialize
};
