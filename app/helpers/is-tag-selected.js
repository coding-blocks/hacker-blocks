import Ember from 'ember';


export function isTagSelected(params) {
  return params.reduce((tags, selectedTag) => {
    if(selectedTag === "All") {
      return true;
    } else {
      return tags.indexOf(selectedTag) !== -1;
    }
  });
}

export default Ember.Helper.helper(isTagSelected);
