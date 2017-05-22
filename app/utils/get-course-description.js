

var getCourseDescription = function(code) {
  let desc = {
   LP:'Launchpad',
   CRX:'Crux',
   ELX:'Elixir',
   ML:'Machine Learning'
  };
  return desc[code];
};

export default getCourseDescription;
