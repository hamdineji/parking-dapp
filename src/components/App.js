import React, { Component } from 'react';
import Web3 from 'web3' ;
import './App.css';
import Parking from '../abis/Parking.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Parking.networks[networkId]
    if(networkData) {
      const parking = web3.eth.Contract(Parking.abi, networkData.address)
      this.setState({ parking })
      const placeCount = await parking.methods.placeCount().call()
      for ( var i=1;i<=placeCount;i++){
       const place = await parking.methods.places(i).call()
       this.setState({places:[...this.state.places,place]})
      }
      this.setState({ loading: false})
    } else {
      window.alert('parking contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      placeCount: 0,
      places: [],
      loading: true
    }
    this.rendrePlace = this.rendrePlace.bind(this)
    this.occupePlace = this.occupePlace.bind(this)
    this.createPlace = this.createPlace.bind(this)
  }




  rendrePlace(id ) {
    this.setState({ loading: true })
    this.state.parking.methods.rendrePlace(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  createPlace(name, price) {
    this.setState({ loading: true })
    this.state.parking.methods.createPlace(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  occupePlace(id,price) {
    this.setState({ loading : true})
    this.state.parking.methods.occupePlace(id).send({from: this.state.account, value : price}).once('receipt',(receipt)=>{
    this.setState({loading : false})
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
           <div className="row">
              <main role="main" className="col-lg-12 d-flex">
               { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                places={this.state.places} 
                createPlace={this.createPlace}
                occupePlace={this.occupePlace} 
                rendrePlace={this.rendrePlace}/>}
              </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
