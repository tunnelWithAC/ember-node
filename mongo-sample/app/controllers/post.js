//cont { store } = this
import Ember from 'ember';

export default Ember.Controller.extend({
  //ajax: Ember.inject.service(),
  post: "there is a #hashtag somewhere #here",
  actions: {
    addPost() {
      var text = this.get('post');
      var length = 0;
      var pos = text.indexOf("#");
      var hashtag ="";
      var hashFound = false;
      console.log("Lenght", this.get('post').length);
      while(pos < this.get('post').length){

        while(text.charAt(pos) !== " " /*&& text.charAt(pos) !== "&"*/){
          hashtag += text.charAt(pos);
          console.log(text.charAt(pos));
          console.log(pos);
          pos++;
        }
        //text = text.replace(hashtag, "<a href=''>" + hashtag + "</a>");
        //console.log(text.substr(pos,).indexOf("#") );
        console.log(text);
        console.log(text.substr(pos,));
        if(text.substr(pos,).indexOf("#") !== -1){
          //pos = text.substr(pos+1,).indexOf("#");
        }
        else {
          break;
        }

        console.log(pos);

        break;
      }
      /*if(text.indexOf("#") !== -1){
        var index = text.indexOf("#");
        while(text.charAt(index) !== " "){
          length++;
          index++;
        }
        text = text.replace(text.substr(11, length), "<a href=''>" + text.substr(11, length) + "</a>");
      }*/


      /*var post = this.store.createRecord('post', {
        content: text,
        author: '26 Aug',
        votes: 0
      });
      post.save();*/

    }
  }
});
