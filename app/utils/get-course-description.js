

var getCourseDescription = function(code) {
  let desc = {
   LP:'Launch Pad',
   CRX:'Crux',
   ELX:'Elixir',
   ML:'Machine Learning'
  };
  return desc[code];
};

export default getCourseDescription;
