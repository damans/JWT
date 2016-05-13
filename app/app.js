/** @jsx React.DOM */
var React    = window.React = require('react'), // assign it to winow for react chrome extension
    /*Header   = require('./header'),
    Content  = require('./router'),*/
    App;


App = React.createClass({

	getInitialState: function() {
    return {email: '', password: ''};
  },
     handleEmail: function(event) {
    this.setState({email:  event.target.value });
  },
  handlePassword: function(event) {
    this.setState({password:  event.target.value });
  },

  handleClick: function(event) {
    console.log(this.state.email+"/"+this.state.password);
    var email=this.state.email, password=this.state.password;
    
    
    // For Ajax Request
      $.ajax({
      		url: 'http://localhost:3001/api/V1/authenticate',
      		method: 'post',
            crossDomain: true,
           	headers : {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5Ac2RuYWluZm90ZWNoLmNvbSIsImlwIjoiOjoxIiwiaWF0IjoxNDYyODU0NzMwLCJleHAiOjE0NjI4NTYxNzB9.jGR7rlUj_IhYy6LLuqegUD3PhrRjqk9Cur2fXLAdAYI'},
            contentType: 'application/x-www-form-urlencoded',
            dataType:  'JSONP',
            data:      { username: email, password: password },
            success: function (result) {
            	console.log('Result : '+ result);
                this.setState({ users: result.items });
            }.bind(this),
            error: function (err) {
            	debugger;
            	alert('error getting users. please try again later');
            }
        });

  },
  render: function () {

      return  <div class="form-group"> <div class="form-group">
		  <input type="text" onChange={this.handleEmail} value={this.state.email} class="form-control input-lg" placeholder="Email"  />
		  </div>
		  <div class="form-group">
		  <input type="password" value={this.state.password}  class="form-control input-lg" placeholder="password" onChange={this.handlePassword}  />
		  </div>
		  <div class="form-group">         
          <a href="">Forgot Password?</a>
          </div>
          <div class="form-group">         
          <input type='button' class="btn btn-lg btn-primary btn-block login_btn" text='Login' onClick={this.handleClick} value='Login' />
         
          </div>
		  </div>
		  ;
  }
});

App.start = function () {
  React.renderComponent(<App/>, document.getElementById('app'));
};

module.exports = window.App = App;
