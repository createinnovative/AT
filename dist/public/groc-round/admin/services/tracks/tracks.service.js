var GrocRoundAdminTracksService;!function(e){var a=function(){return function(e,a,r){var t=this;this.$q=e,this.$http=a,this.ToastService=r,this.urlPrefix="/grocRound/admin/tracks",this.getTracks=function(e){return t.$http.get(t.urlPrefix+"/getTracks?roundId="+e).then(function(e){var a=e.data;return a.payload&&a.payload.foundTracks?t.$q.resolve(a.payload.foundTracks):t.$q.reject({message:a.message})}).catch(function(e){var a=e.message?e.message:"Operation failed";return t.ToastService.showSimple(a),t.$q.reject({message:a})})},this.getTrack=function(e){return t.$http.get(t.urlPrefix+"/getTrack/"+e).then(function(e){var a=e.data;return a.payload&&a.payload.foundTrack?t.$q.resolve(a.payload.foundTrack):t.$q.reject({message:a.message})}).catch(function(e){var a=e.message?e.message:"Operation failed";return t.ToastService.showSimple(a),t.$q.reject({message:a})})},this.addTrack=function(e){return t.$http.post(t.urlPrefix+"/addTrack",e).then(function(e){var a=e.data;return a.payload&&a.payload.addedTrack?(t.ToastService.showSimple("Cart product added"),t.$q.resolve(a.payload.addedTrack)):t.$q.reject({message:a.message})}).catch(function(e){var a=e.message?e.message:"Operation failed";return t.ToastService.showSimple(a),t.$q.reject({message:a})})},this.updateTrack=function(e,a){return t.$http.post(t.urlPrefix+"/updateTrack/"+e,a).then(function(e){var a=e.data;return a.payload&&a.payload.updatedTrack?(t.ToastService.showSimple("Cart product updated"),t.$q.resolve(a.payload.updateTrack)):t.$q.reject({message:a.message})}).catch(function(e){var a=e.message?e.message:"Operation failed";return t.ToastService.showSimple(a),t.$q.reject({message:a})})},this.removeTrack=function(e){return t.$http.get(t.urlPrefix+"/deleteTrack/"+e).then(function(e){var a=e.data;return a.success?(t.ToastService.showSimple("Cart product removed"),t.$q.resolve()):t.$q.reject({message:a.message})}).catch(function(e){var a=e.message?e.message:"Operation failed";return t.ToastService.showSimple(a),t.$q.reject({message:a})})}}}();e.Service=a}(GrocRoundAdminTracksService||(GrocRoundAdminTracksService={}));