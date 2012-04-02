
Backbone.View.prototype.cleanUp = function(){
  this.remove();
  this.unbind();
  if (this.onClose){
    this.onClose();
  }
}

$(function () {    
    //setup config
    var config = {
        
    };

    //kickoff backbone app
    var app = new dts.Router(config);
    Backbone.history.start();
});