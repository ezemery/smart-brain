import React,{Component} from 'react';

class Rank extends Component {
  constructor(props){
    super(props);
    this.state = {
      emojis: ""
    }
  }

  componentDidMount(){
    this.generateRank(this.props.entries)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.entries === this.props.entries && prevProps.name === this.props.name){
      return null;
    }
    this.generateRank(this.props.entries)
  }

  generateRank = (entries)=>{
    fetch(`https://fgyfczadm9.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
    .then(resp=>resp.json())
    .then(data => this.setState({emojis: data.input}))
    .catch(err=>console.log(err))
  }

  render(){
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {this.props.entries}
        </div>
        <div className='white f3'>
          {`Rank Badge: ${this.state.emojis}`}
        </div>
      </div>
    );
  }
}
  


export default Rank;