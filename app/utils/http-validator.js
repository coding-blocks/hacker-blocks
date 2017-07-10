// validator 

const httpValidator = function(link){
        return  /^http:\/\/.*/gi.test(link) || link.length === 0;
    };

export default httpValidator;