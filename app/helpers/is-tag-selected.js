import Ember from 'ember';


export function isTagSelected(params) {
  return params.reduce((tags, selectedTag) => {
    if(selectedTag === "All") {
      return true;
    } else {
      if (tags == null) {
        return false;
      }
      return tags.indexOf(selectedTag) !== -1;
    }
  });
}

export default Ember.Helper.helper(isTagSelected);
