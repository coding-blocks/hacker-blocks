import Ember from 'ember';


export function isTagSelected(params) {
  return params.reduce((problem, selectedTag) => {
    let submission = problem.get('top');
    if(selectedTag === "All") {
      return true;
    } else if(selectedTag === "Solved" && submission.get('result') === 1) {
      // console.log("Solved");
      return true;
    } else if (selectedTag === "Unsolved" && submission.get('result') !== 1){
      // console.log("Unsolved");
      return true;
    } else if(selectedTag === "Wrong" && (submission.get('score') === 0 || submission.get('result') === -1)) {
      // console.log("Wrong");
      return true;
    } else if(selectedTag === "Psolved" && submission.get('score') >0 && submission.get('result') === 0) {
      // console.log("Psolved");
      return true;
    } else {
      let tags = problem.get('tags');
      if (tags == null) {
        return false;
      }
      return tags.indexOf(selectedTag) !== -1;
    }
  });
}

export default Ember.Helper.helper(isTagSelected);
