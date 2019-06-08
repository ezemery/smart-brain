import React from 'react';
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      name: this.props.user.name,
      email: this.props.user.email,
      entries: this.props.user.entries,
      joined: this.props.user.joined
    }
  }

formChange = (event) => {
     switch(event.target.name){
         case "user-name":
             this.setState({name:event.target.value});
             break;
        case "email":
            this.setState({email:event.target.value});
            break;
        default:
            return;
     }
}

onSubmit = () => {
    var name = this.state.name;

    var postRequest = {
        formInput : {
            name
        }
    }
     fetch(`http://161e8afd.ngrok.io/profile/${this.state.id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem("token")
        },
        body: JSON.stringify(postRequest)
      })
      .then(resp=> resp.json())
      .then(data => {
          if(data){
            this.props.toggleModal();
            this.props.loadUser(this.state);
          }
      }).catch(err=>console.log("error", err))
}
  render() {
    return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80">
          <div className="measure">
          <img
             src="http://tachyons.io/img/logo.jpg"
             className ="br-100 ba h3 w3 dib" alt="avatar"/>

             <h1>{this.state.name}</h1>
             <h4>{this.state.email}</h4>
             <p>Member since: January</p>
             <hr/>

            
                <label className="db fw6 lh-copy f6" htmlFor="user-name">Name:</label>
                <input
                  className="pa2 w-100"
                  type="text"
                  placeholder="John"
                  name="user-name"
                  id="name"
                  value={this.state.name} 
                  onChange={this.formChange}
                />
                <label className="db fw6 lh-copy f6" htmlFor="email">Email:</label>
                <input
                  className="pa2 w-100"
                  type="text"
                  placeholder="john@gmail.com"
                  name="email"
                  id="name"
                  value={this.state.email} 
                  disabled={true}
                  onChange={this.formChange}
                />
             <div className="buttons">
                 <button className="submit" onClick={this.onSubmit}> Submit</button>
                 <button className="cancel" onClick={()=>this.props.toggleModal()}> Cancel</button>
             </div>
          </div>
        </main>
        <div className="modal-close" onClick={()=>this.props.toggleModal()}>&times;</div>
      </article>
      </div>
    );
  }
}

export default Profile;