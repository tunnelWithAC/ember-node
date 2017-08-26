//cont { store } = this
import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  post: "there is a #hashtag somewhere",
  actions: {
    /*sendRequest() {
      this.get('ajax').request('/api/posts', {
        host:'localhost:8081',
        method: 'POST',
        dataType: 'json',
        data: {
          foo: 'bar'
        }
      });
    },*/
    addPost() {
      var text = this.get('post');
      console.log(text.indexOf("#"));
      var length = 0;
      if(text.indexOf("#") !== -1){
        var index = text.indexOf("#");
        while(text.charAt(index) !== " "){
          length++;
          index++;
        }

        text = text.replace(text.substr(11, length), "<a href=''>" + text.substr(11, length) + "</a>");
        console.log(text);
      }


      var post = this.store.createRecord('post', {
        content: text,
        author: '25 Aug',
        votes: 0
      });

      post.save();
      //console.log(this.modelFor('post'));
      /*$.ajax({
        type: "POST",
        //contentType: 'application/json',
        url: "http://localhost:8081/api/posts", // Url
        data: {
          content: this.get('post'),
          author: 'Lorem ipsum'
        },
        dataType: 'json'
      });*/
    }
  }
});
