import Ember from 'ember';

export default Ember.Component.extend({
  alertClass: Ember.computed ('explanation', function () {
    let explanation = this.get ('explanation')

    switch (explanation) {
      case "Perfect":
        return "isa_success"
        break
      case "FailedTestcase":
      case "TimeLimitExceeded":
      case "CompilationError":
        return "alert alert-danger"
        break;
      default:
        return "alert alert-info"
    }

    if (explanation === "Perfect") {
      return "isa_success"
    }
    else {
      return "alert alert-info"
    }
  })
});
